import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools";
import AdUnit from "@/components/AdUnit";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Free Online Tools
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Fast, free, and private. No signup required. Word counters, JSON
          formatters, calculators, image tools, and more &mdash; all in one
          place.
        </p>
      </section>

      {/* Ad: Below hero */}
      <AdUnit format="horizontal" className="mb-12" />

      {/* Categories */}
      {categories.map((cat, index) => {
        const catTools = getToolsByCategory(cat.slug);
        if (catTools.length === 0) return null;
        return (
          <div key={cat.slug}>
            <section id={cat.slug} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>{cat.icon}</span> {cat.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group border border-gray-200 bg-white rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl shrink-0">{tool.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            {/* Ad between every 2 categories */}
            {index % 2 === 1 && <AdUnit format="auto" className="mb-12" />}
          </div>
        );
      })}
    </div>
  );
}
