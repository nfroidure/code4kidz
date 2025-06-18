/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Coordinate, type AntLanguage, type AntCommand } from "..";
import grammar from "./ant.ohm-bundle";

const semantics = grammar.createSemantics();
const antDrawing = {
  check,
  evaluate,
} satisfies AntLanguage;

function evaluate(expr: string): AntCommand[] {
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
  integer(_) {
    return parseInt(this.sourceString, 10);
  },
  coordinate(_) {
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

semantics.addOperation<string>("tokenize()", {
  absolutePixelToToken(_) {
    return this.sourceString;
  },
  relativePixelToToken(_) {
    return this.sourceString;
  },
});

semantics.addOperation<{
  type: "p" | "P";
  sequences: { x: number; y: number }[];
}>("command()", {
  pixelToCommand(x) {
    return x.command();
  },
  absolutePixelToCommand(x, _, y) {
    return { type: x.tokenize(), sequences: y.pairSequence() };
  },
  relativePixelToCommand(x, _, y) {
    return { type: x.tokenize(), sequences: y.pairSequence() };
  },
});

semantics.addOperation<
  {
    type: "p" | "P";
    sequences: { x: number; y: number }[];
  }[]
>("run()", {
  command(_, _1) {
    return _1.children.map((child) => child.command());
  },
});

export default antDrawing;
