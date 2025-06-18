import styles from "./contentBlock.module.scss";
import { type ReactNode } from "react";

export default function ContentBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <section className={styles.root + (className ? " " + className : "")}>
      {children}
    </section>
  );
}
