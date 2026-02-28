import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">i</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            Intellure
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/#text" className="hover:text-indigo-600 transition-colors">
            Text Tools
          </Link>
          <Link href="/#developer" className="hover:text-indigo-600 transition-colors">
            Dev Tools
          </Link>
          <Link href="/#calculators" className="hover:text-indigo-600 transition-colors">
            Calculators
          </Link>
          <Link href="/#generators" className="hover:text-indigo-600 transition-colors">
            Generators
          </Link>
        </nav>
      </div>
    </header>
  );
}
