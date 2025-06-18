"use client";

import styles from "./editor.module.scss";
import { useEffect, useState, type ReactNode } from "react";
import {
  commandToPath,
  type Creature,
  type CreatureLanguages,
} from "@/languages";
import { type Dictionary } from "../../../../../dictionary";

export type EditorDictionary = Dictionary["editor"];

import antLanguage from "../../../../../languages/ant/ant";
import dinosaurLanguage from "../../../../../languages/dinosaur/dinosaur";
import wormLanguage from "../../../../../languages/worm/worm";
import larvaLanguage from "../../../../../languages/larva/larva";
import ladybugLanguage from "../../../../../languages/ladybug/ladybug";
import butterflyLanguage from "../../../../../languages/butterfly/butterfly";
import swallowLanguage from "../../../../../languages/swallow/swallow";

const DISPLAY_SIZE = 20;

type CreatureLanguagesMap<T extends Creature = Creature> = Record<
  T,
  CreatureLanguages[T]
>;

const creatureLanguages: CreatureLanguagesMap = {
  ant: antLanguage,
  dinosaur: dinosaurLanguage,
  worm: wormLanguage,
  larva: larvaLanguage,
  ladybug: ladybugLanguage,
  butterfly: butterflyLanguage,
  swallow: swallowLanguage,
};

export default function Editor({
  creature,
  dictionary,
  children,
}: {
  creature: Creature;
  dictionary: EditorDictionary;
  children: ReactNode;
}) {
  const [code, _setCode] = useState("");
  const [ast, setAST] = useState<ReturnType<
    CreatureLanguages[Creature]["evaluate"]
  > | null>(null);
  const result = creatureLanguages[creature].check(code.trim());
  const setCode = (code: string) => {
    _setCode(code);
  };

  useEffect(() => {
    if (code && result.valid) {
      setAST(creatureLanguages[creature].evaluate(code.trim()));
    } else {
      setAST(null);
    }
  }, [creature, code, result.valid]);

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={DISPLAY_SIZE * 25}
          width={DISPLAY_SIZE * 25}
          viewBox={`0 0 ${DISPLAY_SIZE} ${DISPLAY_SIZE}`}
          preserveAspectRatio="xMidYMid slice"
          role="img"
          style={{
            backgroundImage: `url(/images/creatures/${creature}.svg)`,
          }}
        >
          {new Array(DISPLAY_SIZE).fill("").map((_, index) => (
            <path
              key={`v${index}`}
              d={`M0,${index}L${DISPLAY_SIZE},${index}`}
              style={{
                fill: "none",
                stroke: "grey",
                strokeWidth: 0.1,
                strokeDasharray: "0.15",
              }}
            />
          ))}
          {new Array(DISPLAY_SIZE).fill("").map((_, index) => (
            <path
              key={`h${index}`}
              d={`M${index},0L${index},${DISPLAY_SIZE}`}
              style={{
                fill: "none",
                stroke: "grey",
                strokeWidth: 0.1,
                strokeDasharray: "0.15",
              }}
            />
          ))}
          {
            creature === "ant" ? (
              (() => {
                const context = { x: 0, y: 0 };

                return (ast || [])
                  .map((command, index) => {
                    if (command.type !== "P" && command.type !== "p") {
                      return [];
                    }

                    return command.sequences.map((sequence, index2) => {
                      if (command.type === "p") {
                        context.x += sequence.x;
                        context.y += sequence.y;
                      }

                      return (
                        <rect
                          key={`p${index}-${index2}`}
                          width={1}
                          height={1}
                          x={command.type === "p" ? context.x : sequence.x}
                          y={command.type === "p" ? context.y : sequence.y}
                          style={{
                            fill: "green",
                          }}
                        />
                      );
                    });
                  })
                  .flat();
              })()
            ) : (
              <path
                d={(ast || [])
                  .map((command) => commandToPath(command))
                  .join(" ")}
                style={{
                  fill: "none",
                  stroke: "green",
                  strokeWidth: 0.1,
                }}
              />
            )
          }
        </svg>
      </div>
      <div className={styles.editor}>
        <div className={styles.editor}>
          <textarea
            className={styles.textarea}
            spellCheck="false"
            value={code}
            onInput={(e) => setCode(e.currentTarget.value)}
            placeholder={dictionary.placeholder}
          />
          {result.valid ? (
            <span className={styles.info}>
              {dictionary.length} {code?.length || 0}
            </span>
          ) : (
            <span className={styles.warning}>
              {dictionary.syntax} {result.message}
            </span>
          )}
        </div>
        <div className={styles.documentation}>{children}</div>
      </div>
    </div>
  );
}
