/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type BiparametricCommand,
  type Coordinate,
  type WormLanguage,
  type WormCommand,
} from "..";
import grammar from "./worm.ohm-bundle";

const semantics = grammar.createSemantics();

const wormDrawing = {
  check,
  evaluate,
} satisfies WormLanguage;

function evaluate(expr: string): WormCommand[] {
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
  coordinate(_1, _2) {
    return parseInt(this.sourceString, 10);
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
  absoluteHorizontalLineToToken(_) {
    return this.sourceString;
  },
  relativeVerticalLineToToken(_) {
    return this.sourceString;
  },
  absoluteVerticalLineToToken(_) {
    return this.sourceString;
  },
});

semantics.addOperation<WormCommand>("command()", {
  drawToCommand(x) {
    return x.command();
  },
  moveToCommand(x, _, y) {
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
});

semantics.addOperation<WormCommand[]>("run()", {
  command(_s1, moveTo, _s2, drawTo, _s3) {
    return [
      ...moveTo.children.map((child) => child.command()),
      ...drawTo.children.map((child) =>
        child.children.map((child) => child.command())
      ).flat(),
    ];
  },
});

export default wormDrawing;
