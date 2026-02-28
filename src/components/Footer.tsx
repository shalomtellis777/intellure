import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {categories.slice(0, 4).map((cat) => (
            <div key={cat.slug}>
              <h3 className="font-semibold text-gray-900 mb-3">{cat.name}</h3>
              <ul className="space-y-2">
                {getToolsByCategory(cat.slug).map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">i</span>
            </div>
            <span className="font-semibold text-gray-900">Intellure</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Intellure. Free online tools for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
