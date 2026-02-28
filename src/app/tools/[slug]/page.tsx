import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/lib/tools";
import { generateToolMetadata } from "@/lib/metadata";
import { toolComponents } from "@/components/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return generateToolMetadata(slug);
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ToolComponent = toolComponents[slug];
  if (!ToolComponent) notFound();

  return <ToolComponent />;
}
