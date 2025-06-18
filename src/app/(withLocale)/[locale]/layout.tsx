import "../../normalize.css";
import "../../main.scss";
import styles from "./layout.module.scss";
import { type Locale, i18n } from "../../../i18n-config";
import { StrictMode } from "react";
import { ORGANISATION_PRIMARY_COLOR } from "../../../utils/constants";
import GridSystem from "../../../components/_gridSystem";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { getDictionary } from "../../../dictionary";
import { type Viewport } from "next";
import Languages from "@/components/languages";
import Menu from "@/components/menu";

export const viewport: Viewport = {
  themeColor: ORGANISATION_PRIMARY_COLOR,
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "i18n within app directory - Vercel Examples",
  description: "How to do i18n in Next.js 13 within app directory",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: Locale }>;
}) {
  const locale = (await params).locale || i18n.defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <StrictMode>
      <html lang={locale}>
        <body
          className={[
            styles.body,
            ...(process.env.NODE_ENV === "development"
              ? ["showScreenSizes"]
              : []),
          ].join(" ")}
        >
          {process.env.NODE_ENV === "development" ? <GridSystem /> : null}
          <Header locale={locale} dictionary={dictionary} />
          <Languages locale={locale} />
          <Menu locale={locale} dictionary={dictionary.menu} />
          <main className={styles.c4kMain}>
            <div>{children}</div>
          </main>
          <Footer />
        </body>
      </html>
    </StrictMode>
  );
}
