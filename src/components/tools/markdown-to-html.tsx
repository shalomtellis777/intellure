"use client";

import { useState, useMemo } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("markdown-to-html")!;

function simpleMarkdownToHtml(md: string): string {
  let html = md;
  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Code
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");
  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  // Images
  html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />');
  // Unordered lists
  html = html.replace(/^\- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");
  // Blockquote
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr />");
  // Paragraphs
  html = html.replace(/^(?!<[hulo\-bi]|<hr|<block)(.+)$/gm, "<p>$1</p>");
  // Line breaks
  html = html.replace(/\n\n/g, "\n");
  return html;
}

export default function MarkdownToHtml() {
  const [md, setMd] = useState("# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n- Item 3\n\n> A blockquote\n\n`inline code`\n\n[Link](https://example.com)");
  const [tab, setTab] = useState<"preview" | "html">("preview");

  const html = useMemo(() => simpleMarkdownToHtml(md), [md]);

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Markdown
          </label>
          <textarea
            className="w-full h-72 p-4 border border-gray-200 rounded-lg resize-y text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={md}
            onChange={(e) => setMd(e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <button
                onClick={() => setTab("preview")}
                className={`text-sm px-3 py-1 rounded ${tab === "preview" ? "bg-indigo-100 text-indigo-700" : "text-gray-500"}`}
              >
                Preview
              </button>
              <button
                onClick={() => setTab("html")}
                className={`text-sm px-3 py-1 rounded ${tab === "html" ? "bg-indigo-100 text-indigo-700" : "text-gray-500"}`}
              >
                HTML
              </button>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(html)}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Copy HTML
            </button>
          </div>
          {tab === "preview" ? (
            <div
              className="w-full h-72 p-4 border border-gray-200 rounded-lg overflow-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <textarea
              className="w-full h-72 p-4 border border-gray-200 rounded-lg text-sm font-mono bg-gray-50"
              readOnly
              value={html}
            />
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
