"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("meta-tag-generator")!;

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");

  const code = [
    `<meta charset="UTF-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    title && `<title>${title}</title>`,
    desc && `<meta name="description" content="${desc}">`,
    keywords && `<meta name="keywords" content="${keywords}">`,
    author && `<meta name="author" content="${author}">`,
    "",
    "<!-- Open Graph -->",
    title && `<meta property="og:title" content="${title}">`,
    desc && `<meta property="og:description" content="${desc}">`,
    url && `<meta property="og:url" content="${url}">`,
    image && `<meta property="og:image" content="${image}">`,
    `<meta property="og:type" content="website">`,
    "",
    "<!-- Twitter Card -->",
    `<meta name="twitter:card" content="summary_large_image">`,
    title && `<meta name="twitter:title" content="${title}">`,
    desc && `<meta name="twitter:description" content="${desc}">`,
    image && `<meta name="twitter:image" content="${image}">`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <ToolLayout tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Page Title <span className="text-gray-400">({title.length}/60)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="My Awesome Page"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Description <span className="text-gray-400">({desc.length}/160)</span>
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-20 px-4 py-2 border border-gray-200 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="A brief description of your page..."
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/image.png"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Keywords</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="seo, tools, web"
              />
            </div>
          </div>
        </div>

        <div>
          {/* Google Preview */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Google Preview</h3>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-blue-700 text-lg leading-tight hover:underline cursor-pointer">
                {title || "Page Title"}
              </div>
              <div className="text-green-700 text-sm mt-1">{url || "https://example.com"}</div>
              <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                {desc || "Page description will appear here..."}
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Generated Tags</h3>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Copy
              </button>
            </div>
            <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-xs overflow-auto max-h-64 whitespace-pre-wrap">
              {code}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
