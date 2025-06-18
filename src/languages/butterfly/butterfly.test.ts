import { describe, expect, test } from "@jest/globals";

import butterflyDrawing from "./butterfly";

describe("butterfly", () => {
  describe("syntax", () => {
    describe("with good drawings", () => {
      test("should work", () => {
        for (const drawing of [
          "m 5,5",
          "m5,5v10",
          "m5,5h10",
          "M5,5 H10 V10 H-10 V-10",
          "M5,5 H10,11,12 V10.1,.1,12 H-10,11,-12 V10,-11,12L10,-23,12,12,13,24",
          "M300,200 h-150 a150,150 0 1,0 150,-150 z",
          "M600,350 l 50,-25a25,25 -30 0,1 50,-25 l 50,-25 a25,50 -30 0,1 50,-25 l 50,-25 a25,75 -30 0,1 50,-25 l 50,-25 a25,100 -30 0,1 50,-25 l 50,-25",
        ]) {
          expect(butterflyDrawing.check(drawing)).toBeTruthy();
        }
      });
    });

    describe("with bad drawings", () => {
      test("should fail", () => {
        for (const drawing of [
          "12",
          "1,2",
          "M1..2,2....1",
          "1.23,4.56M",
          "M1,2%3,4,5,6",
          "M1,2&",
        ]) {
          expect(butterflyDrawing.check(drawing)).toBeFalsy();
        }
      });
    });
  });

  describe("semantics", () => {
    test("should work with just a command", () => {
      expect(butterflyDrawing.evaluate("M5,5a150,150 0 1,0 150,-150"))
        .toMatchInlineSnapshot(`
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
          "largeArcFlag": 0,
          "r": {
            "x": 150,
            "y": 150,
          },
          "sweepFlag": 1,
          "to": {
            "x": 150,
            "y": -150,
          },
          "xAxisRotation": 0,
        },
      ],
      "type": "a",
    },
  ],
]
`);
    });

    test("should work with a complex command", () => {
      expect(
  butterflyDrawing.evaluate(
    "M5,5 H10,11,12 V10.1,.1,12 H-10,11,-12 V10,-11,12L10,-23,12,12,13,24M300,200 h-150 a150,150 0 1,0 150,-150 z"
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
        {
          "x": 11,
          "y": 0,
        },
        {
          "x": 12,
          "y": 0,
        },
      ],
      "type": "H",
    },
    {
      "sequences": [
        {
          "x": 0,
          "y": 10.1,
        },
        {
          "x": 0,
          "y": 0.1,
        },
        {
          "x": 0,
          "y": 12,
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
          "x": 11,
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
          "y": 10,
        },
        {
          "x": 0,
          "y": -11,
        },
        {
          "x": 0,
          "y": 12,
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
    {
      "sequences": [
        {
          "x": 300,
          "y": 200,
        },
      ],
      "type": "M",
    },
    {
      "sequences": [
        {
          "x": -150,
          "y": 0,
        },
      ],
      "type": "h",
    },
    {
      "sequences": [
        {
          "largeArcFlag": 0,
          "r": {
            "x": 150,
            "y": 150,
          },
          "sweepFlag": 1,
          "to": {
            "x": 150,
            "y": -150,
          },
          "xAxisRotation": 0,
        },
      ],
      "type": "a",
    },
    {
      "type": "z",
    },
  ],
]
`);
    });

    test("should work with another sample of commands", () => {
      expect(
        butterflyDrawing.evaluate(
          "M600,350 l 50,-25a25,25 -30 0,1 50,-25 l 50,-25 a25,50 -30 0,1 50,-25 l 50,-25 a25,75 -30 0,1 50,-25 l 50,-25 a25,100 -30 0,1 50,-25 l 50,-25",
        ),
      ).toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 600,
        "y": 350,
      },
    ],
    "type": "M",
  },
  [
    {
      "sequences": [
        {
          "x": 50,
          "y": -25,
        },
      ],
      "type": "l",
    },
    {
      "sequences": [
        {
          "largeArcFlag": 1,
          "r": {
            "x": 25,
            "y": 25,
          },
          "sweepFlag": 0,
          "to": {
            "x": 50,
            "y": -25,
          },
          "xAxisRotation": -30,
        },
      ],
      "type": "a",
    },
    {
      "sequences": [
        {
          "x": 50,
          "y": -25,
        },
      ],
      "type": "l",
    },
    {
      "sequences": [
        {
          "largeArcFlag": 1,
          "r": {
            "x": 25,
            "y": 50,
          },
          "sweepFlag": 0,
          "to": {
            "x": 50,
            "y": -25,
          },
          "xAxisRotation": -30,
        },
      ],
      "type": "a",
    },
    {
      "sequences": [
        {
          "x": 50,
          "y": -25,
        },
      ],
      "type": "l",
    },
    {
      "sequences": [
        {
          "largeArcFlag": 1,
          "r": {
            "x": 25,
            "y": 75,
          },
          "sweepFlag": 0,
          "to": {
            "x": 50,
            "y": -25,
          },
          "xAxisRotation": -30,
        },
      ],
      "type": "a",
    },
    {
      "sequences": [
        {
          "x": 50,
          "y": -25,
        },
      ],
      "type": "l",
    },
    {
      "sequences": [
        {
          "largeArcFlag": 1,
          "r": {
            "x": 25,
            "y": 100,
          },
          "sweepFlag": 0,
          "to": {
            "x": 50,
            "y": -25,
          },
          "xAxisRotation": -30,
        },
      ],
      "type": "a",
    },
    {
      "sequences": [
        {
          "x": 50,
          "y": -25,
        },
      ],
      "type": "l",
    },
  ],
]
`);
    });
  });
});
