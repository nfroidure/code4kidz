import { describe, expect, test } from "@jest/globals";

import dinosaurDrawing from "./dinosaur";

describe("dinosaur", () => {
  describe("syntax", () => {
    describe("with good drawings", () => {
      test("should work", () => {
        for (const drawing of [
          "m 5,5",
          "m5,5v10",
          "m5,5h10",
          "M5,5 H10 V10 H10 V10",
          "M5,5 H10,11,12 V10,11,12 H10,11,12 V10,11,12",
        ]) {
          expect(dinosaurDrawing.check(drawing)).toBeTruthy();
        }
      });
    });

    describe("with bad drawings", () => {
      test("should fail", () => {
        for (const drawing of [
          "12",
          "1,2",
          "M1.2,2.1",
          "1.23,4.56M",
          "M1,2%3,4,5,6",
          "M1,2&",
        ]) {
          expect(dinosaurDrawing.check(drawing)).toBeFalsy();
        }
      });
    });
  });

  describe("semantics", () => {
    test("should work with several commands", () => {
      expect(
        dinosaurDrawing.evaluate("M5,5 H10 V10 H10 V10"),
      ).toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 5,
        "y": 5,
      },
    ],
    "type": "M",
  },
  [
    {
      "sequences": [
        {
          "x": 10,
          "y": 0,
        },
      ],
      "type": "H",
    },
    {
      "sequences": [
        {
          "x": 0,
          "y": 10,
        },
      ],
      "type": "V",
    },
    {
      "sequences": [
        {
          "x": 10,
          "y": 0,
        },
      ],
      "type": "H",
    },
    {
      "sequences": [
        {
          "x": 0,
          "y": 10,
        },
      ],
      "type": "V",
    },
  ],
]
`);
    });
  });
});
