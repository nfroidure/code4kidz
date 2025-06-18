import ContentBlock from "../../../components/contentBlock";
import Heading1 from "../../../components/h1";
import Paragraph from "../../../components/p";
import styles from "./not-found.module.scss";
import buildMetadata from "../../../utils/metadata";
import { i18n, type Locale } from "../../../i18n-config";
import { getDictionary } from "../../../dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params)?.locale || i18n.defaultLocale;
  const dictionary = await getDictionary(locale);

  return buildMetadata({
    pathname: "/404",
    title: dictionary.notFound.title,
    description: dictionary.notFound.description,
    locale,
  });
}

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params)?.locale || i18n.defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <ContentBlock>
      <Heading1>{dictionary.notFound.title}</Heading1>
      <p className={styles.p}>
        <Paragraph>{dictionary.notFound.description}</Paragraph>
      </p>
    </ContentBlock>
  );
}
