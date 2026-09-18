import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">MarketHub</h1>
          <p className="text-sm text-slate-500">
            Modern marketplace platform
          </p>
        </div>

        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#how-it-works" className="hover:text-slate-900">
            How It Works
          </a>

          <a href="#contact" className="hover:text-slate-900">
            Contact
          </a>
        </nav>
        <Link
          href="/signin"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}