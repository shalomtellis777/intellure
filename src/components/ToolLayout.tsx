import Link from "next/link";
import { getRelatedTools, type Tool } from "@/lib/tools";

export default function ToolLayout({
  tool,
  children,
}: {
  tool: Tool;
  children: React.ReactNode;
}) {
  const related = getRelatedTools(tool.slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{tool.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
      <p className="text-gray-500 mb-8">{tool.description}</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {children}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          About {tool.name}
        </h2>
        <p className="text-gray-600 leading-relaxed">{tool.longDescription}</p>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{t.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {t.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
