/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type BiparametricCommand,
  type StopCommand,
  type Coordinate,
  type CurveToCommand,
  type SmoothCurveToCommand,
  type QuadraticCurveToCommand,
  type ArcCommand,
  type QuadraticSmoothCurveToCommand,
  type SwallowCommand,
  type SwallowLanguage,
} from "..";
import grammar from "./swallow.ohm-bundle";

const semantics = grammar.createSemantics();
const swallowDrawing = {
  check,
  evaluate,
} satisfies SwallowLanguage;

function evaluate(expr: string): SwallowCommand[] {
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

semantics.addOperation<{ p1: Coordinate; p2: Coordinate }>(
  "coordinatePairTuple()",
  {
    coordinatePairTuple(x, _0, y) {
      return {
        p1: x.coordinates(),
        p2: y.coordinates(),
      };
    },
  }
);

semantics.addOperation<{ p1: Coordinate; p2: Coordinate; p3: Coordinate }>(
  "coordinatePairTriplet()",
  {
    coordinatePairTriplet(x, _0, y, _1, z) {
      return {
        p1: x.coordinates(),
        p2: y.coordinates(),
        p3: z.coordinates(),
      };
    },
  }
);

semantics.addOperation<Coordinate[]>("tripletSequence()", {
  coordinatePairTripletSequence_recursive(x, _, y) {
    return [x.coordinatePairTriplet(), ...y.tripletSequence()];
  },
  coordinatePairTripletSequence_single(x) {
    return [x.coordinatePairTriplet()];
  },
  coordinatePairTripletSequence(x) {
    return x.tripletSequence();
  },
});

semantics.addOperation<Coordinate[]>("tupleSequence()", {
  coordinatePairTupleSequence_recursive(x, _, y) {
    return [x.coordinatePairTuple(), ...y.tupleSequence()];
  },
  coordinatePairTupleSequence_single(x) {
    return [x.coordinatePairTuple()];
  },
  coordinatePairTupleSequence(x) {
    return x.tupleSequence();
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
  relativeCubicBezierCurveToToken(_) {
    return this.sourceString;
  },
  absoluteCubicBezierCurveToToken(_) {
    return this.sourceString;
  },
  relativeSmoothCubicBezierCurveToToken(_) {
    return this.sourceString;
  },
  absoluteSmoothCubicBezierCurveToToken(_) {
    return this.sourceString;
  },
  relativeQuadraticBezierCurveToToken(_) {
    return this.sourceString;
  },
  absoluteQuadraticBezierCurveToToken(_) {
    return this.sourceString;
  },
  relativeSmoothQuadraticBezierCurveToToken(_) {
    return this.sourceString;
  },
  absoluteSmoothQuadraticBezierCurveToToken(_) {
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

semantics.addOperation<SwallowCommand>("command()", {
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
  absoluteCubicBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y
        .tripletSequence()
        .map(
          ({
            p1,
            p2,
            p3,
          }: {
            p1: Coordinate;
            p2: Coordinate;
            p3: Coordinate;
          }) => ({
            p1,
            p2,
            to: p3,
          })
        ),
    } satisfies CurveToCommand;
  },
  relativeCubicBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y
        .tripletSequence()
        .map(
          ({
            p1,
            p2,
            p3,
          }: {
            p1: Coordinate;
            p2: Coordinate;
            p3: Coordinate;
          }) => ({
            p1,
            p2,
            to: p3,
          })
        ),
    } satisfies CurveToCommand;
  },
  absoluteSmoothCubicBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y
        .tupleSequence()
        .map(({ p1, p2 }: { p1: Coordinate; p2: Coordinate }) => ({
          p2: p1,
          to: p2,
        })),
    } satisfies SmoothCurveToCommand;
  },
  relativeSmoothCubicBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y
        .tupleSequence()
        .map(({ p1, p2 }: { p1: Coordinate; p2: Coordinate }) => ({
          p2: p1,
          to: p2,
        })),
    } satisfies SmoothCurveToCommand;
  },
  absoluteQuadraticBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y
        .tupleSequence()
        .map(({ p1, p2 }: { p1: Coordinate; p2: Coordinate }) => ({
          p1,
          to: p2,
        })),
    } satisfies QuadraticCurveToCommand;
  },
  relativeQuadraticBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y
        .tupleSequence()
        .map(({ p1, p2 }: { p1: Coordinate; p2: Coordinate }) => ({
          p1,
          to: p2,
        })),
    } satisfies QuadraticCurveToCommand;
  },
  absoluteSmoothQuadraticBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.pairSequence().map((to: Coordinate) => ({ to })),
    } satisfies QuadraticSmoothCurveToCommand;
  },
  relativeSmoothQuadraticBezierCurveToCommand(x, _, y) {
    return {
      type: x.tokenize(),
      sequences: y.pairSequence(),
    } satisfies QuadraticSmoothCurveToCommand;
  },
});

semantics.addOperation<SwallowCommand[]>("run()", {
  command(_s1, moveTo, _s2, drawTo, _s3) {
    return [
      ...moveTo.children.map((child) => child.command()),
      ...drawTo.children.map((child) =>
        child.children.map((child) => child.command())
      ).flat(),
    ];
  },
});

export default swallowDrawing;
