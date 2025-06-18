/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type ArcCommand,
  type BiparametricCommand,
  type StopCommand,
  type Coordinate,
  type ButterflyLanguage,
  type ButterflyCommand,
} from "..";
import grammar from "./butterfly.ohm-bundle";

const semantics = grammar.createSemantics();
const butterflyDrawing = {
  check,
  evaluate,
} satisfies ButterflyLanguage;

function evaluate(expr: string): ButterflyCommand[] {
  const matchResult = grammar.match(expr);

  return semantics(matchResult).run();
}

function check(expr: string) {
  const result = grammar.match(expr);

  return {
    valid: result.succeeded(),
    message: result?.shortMessage,
  };
}

semantics.addOperation<number>("eval()", {
  relativeNumber(_1, _2) {
    return parseFloat(this.sourceString);
  },
  flag(_1) {
    return this.sourceString === "0" ? 0 : 1;
  },
});

semantics.addOperation<Coordinate>("coordinates()", {
  coordinatePair(x, _, y) {
    return { x: x.eval(), y: y.eval() };
  },
});

semantics.addOperation<Coordinate[]>("pairSequence()", {
  coordinatePairSequence_recursive(x, _, y) {
    return [x.coordinates(), ...y.pairSequence()];
  },
  coordinatePairSequence_single(x) {
    return [x.coordinates()];
  },
  coordinatePairSequence(x) {
    return x.pairSequence();
  },
});

semantics.addOperation<number[]>("sequence()", {
  coordinateSequence_recursive(x, _, y) {
    return [x.eval(), ...y.sequence()];
  },
  coordinateSequence_single(x) {
    return [x.eval()];
  },
  coordinateSequence(x) {
    return x.sequence();
  },
});

semantics.addOperation<string>("tokenize()", {
  moveToToken(_) {
    return this.sourceString;
  },
  relativeHorizontalLineToToken(_) {
    return this.sourceString;
  },
  absoluteLineToToken(_) {
    return this.sourceString;
  },
  relativeLineToToken(_) {
    return this.sourceString;
  },
  absoluteHorizontalLineToToken(_) {
    return this.sourceString;
  },
  relativeVerticalLineToToken(_) {
    return this.sourceString;
  },
  absoluteVerticalLineToToken(_) {
    return this.sourceString;
  },
  relativeEllipticalArcToken(_) {
    return this.sourceString;
  },
  absoluteEllipticalArcToken(_) {
    return this.sourceString;
  },
});

semantics.addOperation<ArcCommand["sequences"][number]>("arc()", {
  ellipticalArcArgument(_1, _2, _3, _4, _5, _6, _7, _8, _9) {
    return {
      r: _1.coordinates(),
      xAxisRotation: _3.eval(),
      sweepFlag: _5.eval(),
      largeArcFlag: _7.eval(),
      to: _9.coordinates(),
    };
  },
});

semantics.addOperation<ArcCommand[]>("arcSequence()", {
  ellipticalArcArgumentSequence_recursive(x, _, y) {
    return [x.arc(), ...y.arcSequence()];
  },
  ellipticalArcArgumentSequence_single(x) {
    return [x.arc()];
  },
  ellipticalArcArgumentSequence(x) {
    return x.arcSequence();
  },
});

semantics.addOperation<ButterflyCommand>("command()", {
  drawToCommand(x) {
    return x.command();
  },
  absoluteClosePathToken(_) {
    return { type: this.sourceString as "Z" } satisfies StopCommand;
  },
  relativeClosePathToken(_) {
    return { type: this.sourceString as "z" } satisfies StopCommand;
  },
  moveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.pairSequence(),
    } satisfies BiparametricCommand<string>;
  },
  absoluteLineToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.pairSequence(),
    } satisfies BiparametricCommand<string>;
  },
  relativeLineToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.pairSequence(),
    } satisfies BiparametricCommand<string>;
  },
  absoluteVerticalLineToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.sequence().map((y: number) => ({
        x: 0,
        y,
      })),
    } satisfies BiparametricCommand<string>;
  },
  relativeVerticalLineToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.sequence().map((y: number) => ({
        x: 0,
        y,
      })),
    } satisfies BiparametricCommand<string>;
  },
  absoluteHorizontalLineToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.sequence().map((x: number) => ({
        x,
        y: 0,
      })),
    } satisfies BiparametricCommand<string>;
  },
  relativeHorizontalLineToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.sequence().map((x: number) => ({
        x,
        y: 0,
      })),
    } satisfies BiparametricCommand<string>;
  },
  relativeEllipticalArcCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.arcSequence(),
    } satisfies ArcCommand;
  },
  absoluteEllipticalArcCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.arcSequence(),
    } satisfies ArcCommand;
  },
});

semantics.addOperation<ButterflyCommand[]>("run()", {
  command(_s1, moveTo, _s2, drawTo, _s3) {
    return [
      ...moveTo.children.map((child) => child.command()),
      ...drawTo.children.map((child) =>
        child.children.map((child) => child.command())
      ).flat(),
    ];
  },
});

export default butterflyDrawing;
