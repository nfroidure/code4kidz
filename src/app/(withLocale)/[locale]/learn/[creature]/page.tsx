import buildMetadata from "../../../../../utils/metadata";
import { i18n, type Locale } from "../../../../../i18n-config";
import { getDictionary } from "../../../../../dictionary";
import {
  MarkdownRootNode,
  parseMarkdown,
  renderMarkdown,
} from "@/utils/markdown";
import { pathJoin, readFile } from "@/utils/files";
import Editor from "./editor";
import { type Creature, CREATURES } from "@/languages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; creature: Creature }>;
}) {
  const locale = (await params)?.locale || i18n.defaultLocale;
  const creature = (await params).creature;
  const dictionary = await getDictionary(locale);

  return buildMetadata({
    pathname: `/${locale}/learn/${creature}`,
    title: dictionary.learn.title,
    description: dictionary.learn.description,
    locale,
  });
}

export default async function Code({
  params,
}: {
  params: Promise<{ locale: Locale; creature: Creature }>;
}) {
  const locale = (await params)?.locale || i18n.defaultLocale;
  const creature = (await params).creature;
  const dictionary = await getDictionary(locale);

  return (
    <Editor creature={creature} dictionary={dictionary.editor}>
      {renderMarkdown({ index: 0 }, await parseCreature(locale, creature))}
    </Editor>
  );
}

async function parseCreature(
  locale: Locale,
  creature: Creature
): Promise<MarkdownRootNode> {
  const path = pathJoin("contents", "languages", locale, creature) + ".md";
  const content = await readFile(path);

  return parseMarkdown(content) as MarkdownRootNode;
}

export async function generateStaticParams() {
  const paths = CREATURES.map((creature) => {
    return { creature };
  });

  return paths;
}
