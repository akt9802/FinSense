"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white text-slate-800 border-b border-slate-100">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-1 ring-1 ring-slate-100">
            <Image src="/logo-mark.svg" alt="FinSense" width={40} height={40} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">FinSense</h1>
            <p className="text-xs text-slate-500">Expense Pattern Analyzer</p>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-slate-700 hover:underline">Log in</Link>
          <Link href="/signup" className="ml-2 inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-5 py-2 rounded-full text-sm shadow-md">Get Started</Link>
        </nav>
      </div>
    </header>
  );
}
