"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

const tool = getToolBySlug("lorem-ipsum-generator")!;

const loremWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generateWords(count: number): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(loremWords[i % loremWords.length]);
  }
  result[0] = "Lorem";
  return result.join(" ") + ".";
}

function generateSentences(count: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    const wordCount = 8 + Math.floor(Math.random() * 12);
    const start = (i * 7) % loremWords.length;
    const words: string[] = [];
    for (let j = 0; j < wordCount; j++) {
      words.push(loremWords[(start + j) % loremWords.length]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    sentences.push(words.join(" ") + ".");
  }
  sentences[0] = sentences[0].replace(/^\w+/, "Lorem");
  return sentences.join(" ");
}

function generateParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateSentences(4 + Math.floor(Math.random() * 4)));
  }
  return paragraphs.join("\n\n");
}

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (type === "words") setOutput(generateWords(count));
    else if (type === "sentences") setOutput(generateSentences(count));
    else setOutput(generateParagraphs(count));
  };

  return (
    <ToolLayout tool={tool}>
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm text-gray-600">Generate</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
        <button
          onClick={generate}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
        >
          Generate
        </button>
      </div>
      {output && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {output.split(/\s+/).length} words
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-xs text-indigo-600 hover:text-indigo-800"
            >
              Copy
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
