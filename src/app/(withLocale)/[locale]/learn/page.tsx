import ContentBlock from "../../../../components/contentBlock";
import Heading1 from "../../../../components/h1";
import Paragraph from "../../../../components/p";
import styles from "./page.module.scss";
import buildMetadata from "../../../../utils/metadata";
import { i18n, type Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../dictionary";
import Image from "next/image";
import Link from "next/link";
import { CREATURES } from "@/languages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params)?.locale || i18n.defaultLocale;
  const dictionary = await getDictionary(locale);

  return buildMetadata({
    pathname: `/${locale}/learn`,
    title: dictionary.learn.title,
    description: dictionary.learn.description,
    locale,
  });
}

export default async function Learn({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params)?.locale || i18n.defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <ContentBlock>
      <Heading1>{dictionary.learn.title}</Heading1>
      <Paragraph className={styles.p}>{dictionary.learn.description}</Paragraph>
      <Paragraph className={styles.p}>{dictionary.learn.contents}</Paragraph>
      <ul className={styles.ul}>
        {CREATURES.map((language) => (
          <li key={language} className={styles.li}>
            <Link href={`./learn/${language}`}>
              <Image
                className={styles.img}
                fill={true}
                src={`/images/creatures/${language}.svg`}
                alt={language}
              />
            </Link>
          </li>
        ))}
      </ul>
    </ContentBlock>
  );
}
