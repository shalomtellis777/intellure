import type { Metadata } from "next";
import { getToolBySlug } from "./tools";

export function generateToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: `${tool.name} — Free Online Tool`,
    description: tool.longDescription,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} — Free Online Tool | Intellure`,
      description: tool.description,
      url: `https://intellure.co/tools/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${tool.name} | Intellure`,
      description: tool.description,
    },
    alternates: {
      canonical: `https://intellure.co/tools/${tool.slug}`,
    },
  };
}
