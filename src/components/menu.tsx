"use client";

import styles from "./menu.module.scss";
import { usePathname } from "next/navigation";
import { type Dictionary } from "../dictionary";
import { type Locale } from "../i18n-config";

export type MenuKeys = keyof Dictionary["menu"];

export const MENU = {
  home: {
    en: "",
    fr: "",
  },
  learn: {
    en: "learn",
    fr: "learn",
  },
  about: {
    en: "about",
    fr: "a_propos",
  },
} as const satisfies Record<MenuKeys, Record<Locale, string>>;

export default function Menu({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["menu"];
}) {
  const pathname = usePathname();

  return (
    <nav className={styles.c4kMenu}>
      <ul className={styles.c4kMenuBody}>
        {(Object.keys(MENU) as MenuKeys[]).map((pageName) => {
          const currentPathname = `/${locale}${MENU[pageName][locale] ? "/" : ""}${
            MENU[pageName][locale]
          }`;

          return (
            <li key={pageName} className={styles.c4kMenuItem}>
              <a
                href={currentPathname}
                title={dictionary[pageName].title}
                className={pathname === currentPathname ? styles.selected : ""}
              >
                {dictionary[pageName].label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
