import { describe, expect, test } from "@jest/globals";

import antDrawing from "./ant";

describe("ant", () => {
  describe("syntax", () => {
    describe("with good drawings", () => {
      test("should work", () => {
        for (const drawing of [
          "p1,2",
          "P1,2",
          "p1,2p3,4p4,5",
          "P 1 4 P 1 3",
          "p1,2,3,4,5,6",
          "p1,2,3,4,5,6",
          "p1,2,3,4,5,6P7,8 9 10",
        ]) {
          expect(antDrawing.check(drawing)).toBeTruthy();
        }
      });
    });

    describe("with bad drawings", () => {
      test("should fail", () => {
        for (const drawing of [
          "12",
          "1,2",
          "p1.2,2.1",
          "1.23,4.56P",
          "p1,2%3,4,5,6",
          "p1,2&",
        ]) {
          expect(antDrawing.check(drawing)).toBeFalsy();
        }
      });
    });
  });

  describe("semantics", () => {
    test("should work with just a command", () => {
      expect(antDrawing.evaluate("p1,2")).toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 1,
        "y": 2,
      },
    ],
    "type": "p",
  },
]
`);
    });

    test("should work with a recursive command", () => {
      expect(antDrawing.evaluate("p1,2,3,4")).toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 1,
        "y": 2,
      },
      {
        "x": 3,
        "y": 4,
      },
    ],
    "type": "p",
  },
]
`);
    });

    test("should work with several commands", () => {
      expect(antDrawing.evaluate("p1,2 P2,3 p4,5,6,7 p8,9 10,11 12,13"))
        .toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 1,
        "y": 2,
      },
    ],
    "type": "p",
  },
  {
    "sequences": [
      {
        "x": 2,
        "y": 3,
      },
    ],
    "type": "P",
  },
  {
    "sequences": [
      {
        "x": 4,
        "y": 5,
      },
      {
        "x": 6,
        "y": 7,
      },
    ],
    "type": "p",
  },
  {
    "sequences": [
      {
        "x": 8,
        "y": 9,
      },
      {
        "x": 10,
        "y": 11,
      },
      {
        "x": 12,
        "y": 13,
      },
    ],
    "type": "p",
  },
]
`);
    });
  });
});
