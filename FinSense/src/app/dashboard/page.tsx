"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { 
  FiPieChart, 
  FiTrendingDown, 
  FiZap, 
  FiPlus, 
  FiCalendar,
  FiShoppingBag,
  FiArrowRight,
  FiCoffee,
  FiMapPin,
  FiMonitor,
  FiActivity,
  FiDownload,
  FiUpload,
  FiSettings
} from "react-icons/fi";

const categoryIconMap: Record<string, any> = {
  Food: FiCoffee,
  Travel: FiMapPin,
  Bills: FiActivity,
  Shopping: FiShoppingBag,
  Entertainment: FiMonitor,
  Others: FiPieChart
};

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

  // Mock data for improved dashboard
  const summary = useMemo(
    () => ({ total: 28450, pattern: "Moderate", change: -4.2, savingsEst: 1200 }),
    []
  );

  const categories = useMemo(
    () => [
      { name: "Food", amount: 8600, color: "#0d9488" }, // teal-600
      { name: "Travel", amount: 2400, color: "#3b82f6" }, // blue-500
      { name: "Bills", amount: 7000, color: "#ea580c" }, // orange-600
      { name: "Shopping", amount: 6000, color: "#8b5cf6" }, // violet-500
      { name: "Entertainment", amount: 4450, color: "#ec4899" }, // pink-500
      { name: "Others", amount: 1500, color: "#64748b" }, // slate-500
    ],
    []
  );

  const total = summary.total;

  // computed month-specific data (needs categories to exist)
  const monthData = perMonth[selectedMonth] || perMonth["2025-10"];
  const monthTotal = monthData.total;
  const monthCategories = categories.map((c, i) => ({ ...c, amount: monthData.categories[i] ?? c.amount }));
  const monthRecent: { id: number; label: string; amount: number; date: string; category: string }[] = monthData.recent;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 shadow-lg shadow-teal-500/30 flex items-center justify-center text-white text-xl font-bold tracking-tighter ring-4 ring-teal-50">
              FS
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">Welcome back</h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">Here’s your financial snapshot for <span className="text-teal-700 font-bold">{range}</span>.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer hover:bg-slate-50"
                aria-label="Date range"
              >
                <option>This month</option>
                <option>Last 3 months</option>
                <option>Year to date</option>
              </select>
              <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-teal-500 transition-colors" />
            </div>

            <Link href="/dashboard/planmonth" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transform hover:-translate-y-0.5 transition-all text-sm">
              Plan your month
            </Link>

            <Link href="/dashboard/addexpense" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-teal-500/20 transform hover:-translate-y-0.5 transition-all text-sm">
              <FiPlus strokeWidth={3} /> Add expense
            </Link>
          </div>
        </div>

        {/* Fancy KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Main KPI */}
          <div className="relative overflow-hidden rounded-3xl p-8 shadow-xl bg-gradient-to-br from-teal-600 to-teal-400 group">
            <div className="absolute top-0 right-0 p-6 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
              <FiPieChart size={120} />
            </div>
            <div className="relative z-10 text-white">
              <div className="flex items-center gap-2 text-teal-50 font-semibold tracking-wide uppercase text-xs mb-2">
                Total spent
              </div>
              <div className="text-4xl font-extrabold tracking-tight mb-2">₹ {total.toLocaleString()}</div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                <FiTrendingDown />
                <span><span className="font-bold">{summary.change}%</span> vs last period</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 shadow-sm bg-white border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Avg per category</div>
                <div className="text-3xl font-extrabold text-slate-800">₹ {Math.round(total / categories.length).toLocaleString()}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiActivity size={20} />
              </div>
            </div>
            <div className="mt-6">
               <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                 <span>Top: {categories[0].name}</span>
               </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500" style={{ width: `${Math.min(100, (total / 50000) * 100)}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 shadow-sm bg-white border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 text-green-50 opacity-50">
              <FiZap size={150} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Projected Savings</div>
                  <div className="text-3xl font-extrabold text-slate-800">₹ {summary.savingsEst.toLocaleString()}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <FiTrendingDown size={20} />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                 <div className="text-sm font-medium text-slate-500">Based on recent trends</div>
                 <div className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{summary.change}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Wider) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Spending Overview */}
            <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Spending Overview</h3>
                  <p className="text-sm text-slate-500 mt-1">Breakdown of your expenses.</p>
                </div>
                <div className="relative group">
                  <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(e.target.value)} 
                    className="appearance-none pl-4 pr-10 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer hover:bg-slate-100"
                  >
                    <option value="2025-10">October 2025</option>
                    <option value="2025-09">September 2025</option>
                    <option value="2025-08">August 2025</option>
                  </select>
                  <FiCalendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-teal-500" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3 flex items-center justify-center relative">
                  <div className="w-48 h-48 rounded-full border-[12px] border-slate-50 flex items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] relative">
                     {/* pseudo chart ring */}
                     <svg className="absolute inset-0 w-full h-full -rotate-90">
                       <circle cx="50%" cy="50%" r="46%" fill="transparent" stroke="#0d9488" strokeWidth="12" strokeDasharray="200 100" strokeLinecap="round" />
                       <circle cx="50%" cy="50%" r="46%" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="80 200" strokeDashoffset="-200" strokeLinecap="round" />
                     </svg>
                    <div className="text-center relative z-10">
                      <div className="text-4xl font-black text-slate-800">{Math.round((monthCategories[0].amount / monthTotal) * 100)}%</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Food Share</div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {monthCategories.map((c) => {
                      const Icon = categoryIconMap[c.name] || FiPieChart;
                      const percentage = Math.round((c.amount / monthTotal) * 100);
                      return (
                        <div key={c.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: c.color }}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-slate-700">{c.name}</div>
                            <div className="text-xs text-slate-500 font-medium">₹ {c.amount.toLocaleString()}</div>
                          </div>
                          <div className="text-sm font-bold text-slate-800">{percentage}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Recent Transactions</h3>
                <Link href="#" className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors group">
                  View all <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="divide-y divide-slate-100/80">
                {monthRecent.map((r) => {
                  const Icon = categoryIconMap[r.category] || FiShoppingBag;
                  const color = categories.find(c => c.name === r.category)?.color || '#94a3b8';
                  return (
                    <div key={r.id} className="py-4 flex items-center justify-between group hover:bg-slate-50 -mx-4 px-4 rounded-2xl transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: color }}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <div className="text-base font-bold text-slate-800 group-hover:text-teal-700 transition-colors">{r.label}</div>
                          <div className="text-xs font-medium text-slate-500 mt-0.5">{new Date(r.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}  •  {r.category}</div>
                        </div>
                      </div>
                      <div className="text-base font-extrabold text-slate-800">₹ {r.amount.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-8">
            
            {/* Smart Suggestions */}
            <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-800 p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
                  <FiZap size={18} />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">Smart Suggestions</h4>
              </div>
              <p className="text-sm text-slate-400 mb-6 font-medium">AI-driven actions to save this month.</p>
              
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="mt-1 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                  <div>
                    <div className="text-sm font-semibold text-white">Cut dining out by 15%</div>
                    <div className="text-xs font-medium text-teal-300 mt-1">Est. savings ₹ {Math.round(summary.savingsEst * 0.5)}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <div>
                    <div className="text-sm font-semibold text-white">Review subscriptions</div>
                    <div className="text-xs font-medium text-slate-400 mt-1">Found 3 unused recurring payments</div>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6">
                <button className="w-full inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-4 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-teal-500/30">
                  <FiPlus strokeWidth={3} /> Apply Quick Savings
                </button>
              </div>
            </div>

            {/* Shortcuts */}
            <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
              <h4 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/addexpense" className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-2xl transition-all text-slate-700 hover:text-teal-600 group">
                  <FiPlus size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Add Expense</span>
                </Link>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-2xl transition-all text-slate-700 hover:text-teal-600 group">
                  <FiUpload size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Import CSV</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-2xl transition-all text-slate-700 hover:text-teal-600 group">
                  <FiDownload size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Export Data</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-2xl transition-all text-slate-700 hover:text-teal-600 group">
                  <FiSettings size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold">Settings</span>
                </button>
              </div>
            </div>
            
          </aside>
        </div>
      </main>
    </div>
  );
}
