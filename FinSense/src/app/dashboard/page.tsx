"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [range, setRange] = useState("This month");
  const [selectedMonth, setSelectedMonth] = useState("2025-10");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const event = new Event("userAuthenticated");
      window.dispatchEvent(event);
    }
  }, []);

  // mock per-month dataset
  const perMonth = useMemo<Record<string, { total: number; categories: number[]; recent: { id: number; label: string; amount: number; date: string; category: string }[] }>>(
    () => ({
      "2025-10": {
        total: 29950,
        categories: [8600, 2400, 7000, 6000, 4450, 1500],
        recent: [
          { id: 1, label: "Grocery - BigMart", amount: 1200, date: "2025-10-10", category: "Food" },
          { id: 2, label: "Flight ticket", amount: 4500, date: "2025-10-05", category: "Travel" },
          { id: 3, label: "Electricity bill", amount: 3200, date: "2025-10-02", category: "Bills" },
        ],
      },
      "2025-09": {
        total: 32800,
        categories: [9400, 3000, 7200, 6200, 4400, 1600],
        recent: [
          { id: 4, label: "Restaurant", amount: 1800, date: "2025-09-22", category: "Food" },
          { id: 5, label: "Train tickets", amount: 700, date: "2025-09-18", category: "Travel" },
        ],
      },
      "2025-08": {
        total: 26900,
        categories: [7000, 2100, 6000, 4800, 3600, 1400],
        recent: [
          { id: 6, label: "Online shopping", amount: 2500, date: "2025-08-12", category: "Shopping" },
        ],
      },
    }),
    []
  );

  // (month-specific computation will be done after categories & recent are defined)

  // Mock data for improved dashboard
  const summary = useMemo(
    () => ({ total: 28450, pattern: "Moderate", change: -4.2, savingsEst: 1200 }),
    []
  );

  const categories = useMemo(
    () => [
      { name: "Food", amount: 8600, color: "#4fd1c5" },
      { name: "Travel", amount: 2400, color: "#c6f6d5" },
      { name: "Bills", amount: 7000, color: "#38b2ac" },
      { name: "Shopping", amount: 6000, color: "#319795" },
      { name: "Entertainment", amount: 4450, color: "#9ae6b4" },
      { name: "Others", amount: 1500, color: "#b2f5ea" },
    ],
    []
  );

  // removed unused `recent` placeholder — per-month data is used instead

  const total = summary.total;

  // computed month-specific data (needs categories to exist)
  const monthData = perMonth[selectedMonth] || perMonth["2025-10"];
  const monthTotal = monthData.total;
  const monthCategories = categories.map((c, i) => ({ ...c, amount: monthData.categories[i] ?? c.amount }));
  const monthRecent: { id: number; label: string; amount: number; date: string; category: string }[] = monthData.recent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 shadow-md flex items-center justify-center text-white text-lg font-bold">FS</div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
              <p className="text-sm text-slate-500 mt-1">Here’s your financial snapshot for <span className="font-medium">{range}</span>.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm"
                aria-label="Date range"
              >
                <option>This month</option>
                <option>Last 3 months</option>
                <option>Year to date</option>
              </select>
            </div>

            <Link href="/dashboard/planmonth" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow hover:scale-[1.02] transition">Plan your month</Link>

            <Link href="/dashboard/addexpense" className="inline-flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition">+ Add expense</Link>
          </div>
        </div>

        {/* Fancy KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="relative overflow-hidden rounded-2xl p-5 shadow-xl" style={{ background: 'linear-gradient(135deg,#0bc5a6, #2dd4bf)' }}>
            <div className="text-white">
              <div className="text-xs opacity-90">Total spent</div>
              <div className="text-2xl font-extrabold mt-1">₹ {total.toLocaleString()}</div>
              <div className="text-sm mt-2 opacity-90">Compared to last period: <span className="font-semibold">{summary.change}%</span></div>
            </div>
            <div className="absolute right-4 top-4 opacity-20 text-6xl font-bold">₹</div>
          </div>

          <div className="rounded-2xl p-5 shadow-md bg-white border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">Average per category</div>
                <div className="text-2xl font-extrabold mt-1">₹ {Math.round(total / categories.length).toLocaleString()}</div>
              </div>
              <div className="text-sm text-slate-500">Top: {categories[0].name}</div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-full h-2 bg-slate-100 rounded-full">
                <div className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-500" style={{ width: `${Math.min(100, (total / 50000) * 100)}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5 shadow-md bg-white border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">Projected savings</div>
                <div className="text-2xl font-extrabold mt-1">₹ {summary.savingsEst.toLocaleString()}</div>
              </div>
              <div className="text-sm text-emerald-600">{summary.change}%</div>
            </div>
            <div className="mt-3 text-xs text-slate-500">Based on your recent trends</div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl shadow-md bg-white border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Spending overview</h3>
                <div className="flex items-center gap-3">
                  {/* <div className="text-sm text-slate-500">{range}</div> */}
                  <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm">
                    <option value="2025-10">October 2025</option>
                    <option value="2025-09">September 2025</option>
                    <option value="2025-08">August 2025</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex gap-6">
                <div className="w-1/3 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-teal-50 to-white flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <div className="text-2xl font-extrabold">{Math.round((monthCategories[0].amount / monthTotal) * 100)}%</div>
                      <div className="text-xs text-slate-500">Food share</div>
                    </div>
                  </div>
                </div>
                <div className="w-2/3">
                  <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">[Interactive chart placeholder]</div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {monthCategories.map((c) => (
                      <div key={c.name} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-50 shadow-sm hover:scale-[1.02] transition">
                        <div className="w-3 h-3 rounded" style={{ background: c.color }} />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{c.name}</div>
                          <div className="text-xs text-slate-500">₹ {c.amount.toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-slate-600">{Math.round((c.amount / monthTotal) * 100)}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl shadow-md bg-white border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent transactions</h3>
                <a className="text-sm text-teal-600 hover:underline" href="#">View all</a>
              </div>
              <div className="mt-4 divide-y divide-slate-100">
                {monthRecent.map((r) => (
                  <div key={r.id} className="py-3 flex items-center justify-between hover:bg-slate-50 rounded-md p-2 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 9 4-18 3 9h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{r.label}</div>
                        <div className="text-xs text-slate-500">{r.date} • {r.category}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">₹ {r.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-md">
              <h4 className="text-sm font-semibold">Smart suggestions</h4>
              <p className="text-xs text-slate-500 mt-2">Actions that can help you save this month.</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="text-teal-600 mt-1">●</div>
                  <div>
                    <div className="text-sm font-medium">Cut dining out by 15%</div>
                    <div className="text-xs text-slate-500">Estimated savings ₹ {Math.round(summary.savingsEst * 0.5)}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="text-teal-600 mt-1">●</div>
                  <div>
                    <div className="text-sm font-medium">Review subscriptions</div>
                    <div className="text-xs text-slate-500">We found 3 recurring payments</div>
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <button className="w-full inline-flex items-center justify-center bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded">Apply quick savings</button>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-100 p-6 shadow-md">
              <h4 className="text-sm font-semibold">Shortcuts</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link href="/dashboard/addexpense" className="text-sm bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded inline-block text-center">Add expense</Link>
                <button className="text-sm bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded">Import CSV</button>
                <button className="text-sm bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded">Export</button>
                <button className="text-sm bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded">Settings</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
