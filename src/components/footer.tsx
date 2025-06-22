import styles from "./footer.module.scss";
import { ORGANISATION_NAME } from "../utils/constants";
import { type Dictionary } from "@/dictionary";

export default function Footer({
  dictionary,
}: {
  dictionary: Dictionary["footer"];
}) {
  return (
    <div className={styles.root}>
      <footer>
        <div className={styles.bottom}>
          <p>
            <span>
              © {ORGANISATION_NAME} - {dictionary.copyright}
            </span>{" "}
            -{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}
