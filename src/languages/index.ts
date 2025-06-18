export type Coordinate = { x: number; y: number };
export type StopCommand = { type: "Z" | "z" };
export type BiparametricCommand<T> = {
  type: T;
  sequences: Coordinate[];
};
export type ArcCommand = {
  type: "a" | "A";
  sequences: {
    r: Coordinate;
    xAxisRotation: number;
    largeArcFlag: 0 | 1;
    sweepFlag: 0 | 1;
    to: Coordinate;
  }[];
};
export type CurveToCommand = {
  type: "c" | "C";
  sequences: {
    p1: Coordinate;
    p2: Coordinate;
    to: Coordinate;
  }[];
};
export type SmoothCurveToCommand = {
  type: "s" | "S";
  sequences: {
    p2: Coordinate;
    to: Coordinate;
  }[];
};
export type QuadraticCurveToCommand = {
  type: "q" | "Q";
  sequences: {
    p1: Coordinate;
    to: Coordinate;
  }[];
};
export type QuadraticSmoothCurveToCommand = {
  type: "t" | "T";
  sequences: {
    to: Coordinate;
  }[];
};

export function commandToPath(
  command:
    | AntCommand
    | ButterflyCommand
    | DinosaurCommand
    | LadybugCommand
    | LarvaCommand
    | SwallowCommand
    | WormCommand
) {
  if (command.type === "Z" || command.type === "z") {
    return command.type;
  }
  if (command.type === "A" || command.type === "a") {
    return `${command.type} ${command.sequences
      .map(
        (sequence) =>
          `${sequence.r.x} ${sequence.r.y} ${sequence.xAxisRotation} ${sequence.largeArcFlag} ${sequence.sweepFlag} ${sequence.to.x} ${sequence.to.y}`
      )
      .join(",")}`;
  }
  if (command.type === "C" || command.type === "c") {
    return `${command.type} ${command.sequences
      .map(
        (sequence) =>
          `${sequence.p1.x} ${sequence.p1.y} ${sequence.p2.x} ${sequence.p2.y} ${sequence.to.x} ${sequence.to.y}`
      )
      .join(",")}`;
  }
  if (command.type === "S" || command.type === "s") {
    return `${command.type} ${command.sequences
      .map(
        (sequence) =>
          `${sequence.p2.x} ${sequence.p2.y} ${sequence.to.x} ${sequence.to.y}`
      )
      .join(",")}`;
  }
  if (command.type === "Q" || command.type === "q") {
    return `${command.type} ${command.sequences
      .map(
        (sequence) =>
          `${sequence.p1.x} ${sequence.p1.y} ${sequence.to.x} ${sequence.to.y}`
      )
      .join(",")}`;
  }
  if (command.type === "T" || command.type === "t") {
    return `${command.type} ${command.sequences
      .map((sequence) => `${sequence.to.x} ${sequence.to.y}`)
      .join(",")}`;
  }
  if (command.type === "L" || command.type === "l") {
    return `${command.type} ${command.sequences
      .map((sequence) => `${sequence.x} ${sequence.y}`)
      .join(",")}`;
  }
  if (command.type === "M" || command.type === "m") {
    return `${command.type} ${command.sequences
      .map((sequence) => `${sequence.x} ${sequence.y}`)
      .join(",")}`;
  }
  if (command.type === "P" || command.type === "p") {
    return `${command.type} ${command.sequences
      .map((sequence) => `${sequence.x} ${sequence.y}`)
      .join(",")}`;
  }
  if (command.type === "H" || command.type === "h") {
    return `${command.type} ${command.sequences
      .map((sequence) => `${sequence.x}`)
      .join(",")}`;
  }
  if (command.type === "V" || command.type === "v") {
    return `${command.type} ${command.sequences
      .map((sequence) => `${sequence.y}`)
      .join(",")}`;
  }
  console.log({command})
  return command.type
}

export const CREATURES = [
  "ant",
  "dinosaur",
  "worm",
  "larva",
  "ladybug",
  "butterfly",
  "swallow",
] as const;

export type CreatureLanguage<T> = {
  check: (code: string) =>
    | {
        valid: true;
      }
    | {
        valid: false;
        message?: string;
      };
  evaluate: (code: string) => T;
};

export type WormCommand = BiparametricCommand<
  "m" | "M" | "h" | "H" | "v" | "V"
>;
export type WormLanguage = CreatureLanguage<WormCommand[]>;

export type SwallowCommand =
  | BiparametricCommand<"m" | "M" | "h" | "H" | "v" | "V" | "l" | "L">
  | ArcCommand
  | CurveToCommand
  | SmoothCurveToCommand
  | QuadraticCurveToCommand
  | QuadraticSmoothCurveToCommand
  | StopCommand;
export type SwallowLanguage = CreatureLanguage<SwallowCommand[]>;

export type LarvaCommand =
  | BiparametricCommand<"m" | "M" | "h" | "H" | "v" | "V">
  | StopCommand;
export type LarvaLanguage = CreatureLanguage<LarvaCommand[]>;

export type LadybugCommand =
  | BiparametricCommand<"m" | "M" | "h" | "H" | "v" | "V" | "l" | "L">
  | StopCommand;
export type LadybugLanguage = CreatureLanguage<LadybugCommand[]>;

export type DinosaurCommand = BiparametricCommand<
  "m" | "M" | "h" | "H" | "v" | "V"
>;
export type DinosaurLanguage = CreatureLanguage<DinosaurCommand[]>;

export type ButterflyCommand =
  | BiparametricCommand<"m" | "M" | "h" | "H" | "v" | "V" | "l" | "L">
  | ArcCommand
  | StopCommand;
export type ButterflyLanguage = CreatureLanguage<ButterflyCommand[]>;

export type AntCommand = BiparametricCommand<"p" | "P">;
export type AntLanguage = CreatureLanguage<AntCommand[]>;

export type Creature = (typeof CREATURES)[number];

export type CreatureLanguages = {
  ant: AntLanguage;
  dinosaur: DinosaurLanguage;
  worm: WormLanguage;
  larva: LarvaLanguage;
  ladybug: LadybugLanguage;
  butterfly: ButterflyLanguage;
  swallow: SwallowLanguage;
};
