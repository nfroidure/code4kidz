import styles from "./header.module.scss";
import { type Dictionary } from "../dictionary";
import { type Locale } from "../i18n-config";

export default function Header({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <header className={styles.c4kHeader}>
      <div className={styles.c4kHeaderTitle}>
        <h1>
          <a
            href={`/${locale}`}
            title={dictionary.menu.home.title}
            className={styles.c4kHeaderLogo}
          >
            <img src="/images/logo.svg" alt={dictionary.header.alt} />
          </a>
        </h1>
      </div>
    </header>
  );
}
