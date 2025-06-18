import { describe, expect, test } from "@jest/globals";

import swallowDrawing from "./swallow";

describe("swallow", () => {
  describe("syntax", () => {
    describe("with good drawings", () => {
      test("should work", () => {
        for (const drawing of [
          "m 5,5",
          "m5,5v10",
          "m5,5h10",
          "M5,5 H10 V10 H-10 V-10",
          "M5,5 H10,11,12 V10,11,12 H-10,11,-12 V10,-11,12L10,-23,12,12,13,24",
          "M100,200 C100,100 250,100 250,200S400,300 400,200",
          "M200,300 Q400,50 600,300 T1000,300",
        ]) {
          expect(swallowDrawing.check(drawing)).toBeTruthy();
        }
      });
    });

    describe("with bad drawings", () => {
      test("should fail", () => {
        for (const drawing of [
          "12",
          "1,2",
          "M1..2,2...1",
          "1.23,4.56M",
          "M1,2%3,4,5,6",
          "M1,2&",
        ]) {
          expect(swallowDrawing.check(drawing)).toBeFalsy();
        }
      });
    });
  });

  describe("semantics", () => {
    test("should work with just a curve command", () => {
      expect(swallowDrawing.evaluate("M100,100 C100,100 250,100 250,200"))
        .toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 100,
        "y": 100,
      },
    ],
    "type": "M",
  },
  [
    {
      "sequences": [
        {
          "p1": {
            "x": 100,
            "y": 100,
          },
          "p2": {
            "x": 250,
            "y": 100,
          },
          "to": {
            "x": 250,
            "y": 200,
          },
        },
      ],
      "type": "C",
    },
  ],
]
`);
    });

    test("should work with just a smooth curve command", () => {
      expect(
  swallowDrawing.evaluate("M100,100S400,300 400,200")
).toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 100,
        "y": 100,
      },
    ],
    "type": "M",
  },
  [
    {
      "sequences": [
        {
          "p2": {
            "x": 400,
            "y": 300,
          },
          "to": {
            "x": 400,
            "y": 200,
          },
        },
      ],
      "type": "S",
    },
  ],
]
`);
    });

    test("should work with just an quadratic curve command", () => {
      expect(
  swallowDrawing.evaluate("M100,100Q400,50 600,300")
).toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 100,
        "y": 100,
      },
    ],
    "type": "M",
  },
  [
    {
      "sequences": [
        {
          "p1": {
            "x": 400,
            "y": 50,
          },
          "to": {
            "x": 600,
            "y": 300,
          },
        },
      ],
      "type": "Q",
    },
  ],
]
`);
    });

    test("should work with just a quadratic smooth curve command", () => {
      expect(swallowDrawing.evaluate("M100,100T1000,300")).toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 100,
        "y": 100,
      },
    ],
    "type": "M",
  },
  [
    {
      "sequences": [
        {
          "to": {
            "x": 1000,
            "y": 300,
          },
        },
      ],
      "type": "T",
    },
  ],
]
`);
    });

    test("should work with just an arc command", () => {
      expect(swallowDrawing.evaluate("M100,100a150,150 0 1,0 150,-150")).
toMatchInlineSnapshot(`
[
  {
    "sequences": [
      {
        "x": 100,
        "y": 100,
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
        swallowDrawing.evaluate(
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
        swallowDrawing.evaluate(
          "M600,350 l 50,-25a25,25 -30 0,1 50,-25 l 50,-25 a25,50 -30 0,1 50,-25 l 50,-25 a25,75 -30 0,1 50,-25 l 50,-25 a25,100 -30 0,1 50,-25 l 50,-25"
        )
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
  test("should work with several commands", () => {
    expect(
      swallowDrawing.evaluate(
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
