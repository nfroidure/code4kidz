import { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import {
  ORGANISATION_NAME,
  DOMAIN_NAME,
  ASSET_PREFIX,
} from "../utils/constants";
import type { Metadata, ResolvedMetadata } from "next";
import { type Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionary";

// Copied from NextJS types, replace per imports whenever possible
type OGImageDescriptor = {
  url: string;
  alt?: string;
  type?: string;
  width?: number;
  height?: number;
};
type OGAudioDescriptor = {
  url: string;
  type?: string;
};
export type OGAudio = NonNullable<
  NonNullable<ResolvedMetadata["openGraph"]>["audio"]
>[number];

export default async function buildMetadata({
  pathname,
  title,
  description,
  type = "website",
  image,
  audio,
  locale,
}: {
  pathname: string;
  title: string;
  description: string;
  type?: OpenGraphType;
  image?: OGImageDescriptor;
  audio?: OGAudioDescriptor;
  locale: Locale;
}): Promise<Metadata> {
  const dictionary = await getDictionary(locale);
  const fullTitle = `${title ? `${title} - ` : ""}${ORGANISATION_NAME}`;
  const canonicalURL = ASSET_PREFIX + (pathname || "/");
  const finalImage: OGImageDescriptor =
    typeof image !== "undefined"
      ? /^https?:\/\//.test(image.url)
        ? image
        : {
            ...image,
            url:
              ASSET_PREFIX + (image.url.startsWith("/") ? "" : "/") + image.url,
          }
      : {
          alt: dictionary.meta.banner.alt,
          url: process.env.NEXT_PUBLIC_BASE_URL + "/images/banner.png",
        };

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(`https://${DOMAIN_NAME}`),
    alternates: {
      canonical: canonicalURL,
    },
    authors: [
      {
        name: ORGANISATION_NAME,
        url: `https://${DOMAIN_NAME}`,
      },
    ],
    icons: {
      icon: [
        {
          url: ASSET_PREFIX + "/images/favicon.svg",
          type: "image/svg+xml",
          sizes: "any",
        },
        {
          url: ASSET_PREFIX + "/images/favicon-16.png",
          type: "image/png",
          sizes: "16x16",
        },
        {
          url: ASSET_PREFIX + "/images/favicon-128.png",
          type: "image/png",
          sizes: "128x128",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      url: canonicalURL,
      title: fullTitle,
      description,
      images: [finalImage],
      siteName: ORGANISATION_NAME,
      locale: dictionary.meta.locale,
      type,
      ...(typeof audio !== "undefined"
        ? {
            audio: [audio],
          }
        : {}),
    },
  };
}
