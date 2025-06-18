import { describe, expect, test } from "@jest/globals";

import larvaDrawing from "./larva";

describe("larva", () => {
  describe("syntax", () => {
    describe("with good drawings", () => {
      test("should work", () => {
        for (const drawing of [
          "m 5,5",
          "m5,5v10",
          "m5,5h10",
          "M5,5 H10 V10 H-10 V-10",
          "M5,5 H10,11,12 V10,11,12 H-10,11,-12 V10,-11,12L10,-23,12,12,13,24",
        ]) {
          expect(larvaDrawing.check(drawing)).toBeTruthy();
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
          expect(larvaDrawing.check(drawing)).toBeFalsy();
        }
      });
    });
  });

  describe("semantics", () => {
    test("should work with several commands", () => {
      expect(
        larvaDrawing.evaluate(
          "M5,5 H10 V10 H-10,-12 V-10 -12L10,-23,12,12,13,24"
        )
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
          "x": -10,
          "y": 0,
        },
        {
          "x": -12,
          "y": 0,
        },
      ],
      "type": "H",
    },
    {
      "sequences": [
        {
          "x": 0,
          "y": -10,
        },
        {
          "x": 0,
          "y": -12,
        },
      ],
      "type": "V",
    },
    {
      "sequences": [
        {
          "x": 10,
          "y": -23,
        },
        {
          "x": 12,
          "y": 12,
        },
        {
          "x": 13,
          "y": 24,
        },
      ],
      "type": "L",
    },
  ],
]
`);
    });
  });
});
