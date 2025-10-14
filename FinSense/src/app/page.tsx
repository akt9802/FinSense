"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col text-slate-800">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <section className="space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight">
            Understand your spending. Make smarter choices.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">FinSense helps you spot patterns in your monthly expenses and gives practical, human-friendly advice — not just a label. See where your money goes, why it matters, and simple steps to improve.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/signup" className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow transform hover:-translate-y-0.5 transition">Create free account</Link>
            <Link href="/login" className="inline-flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-lg text-slate-700 hover:bg-slate-50">Login</Link>
            <a href="#how" className="inline-flex items-center gap-2 border border-slate-200 px-5 py-3 rounded-lg text-slate-700 hover:bg-slate-50">How it works</a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition-shadow hover:scale-[1.02]">
              <h4 className="text-sm font-semibold">Classifies your spending</h4>
              <p className="text-xs mt-2 text-slate-500">A lightweight Decision Tree model labels patterns as Healthy, Moderate or Risky — we show confidence and context.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition-shadow hover:scale-[1.02]">
              <h4 className="text-sm font-semibold">Clear visual breakdowns</h4>
              <p className="text-xs mt-2 text-slate-500">Pie charts and trend lines that make it simple to spot where your money is concentrated.</p>
            </div>
            <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition-shadow hover:scale-[1.02]">
              <h4 className="text-sm font-semibold">Actionable suggestions</h4>
              <p className="text-xs mt-2 text-slate-500">Practical tips like “cut monthly eating out by 20%” with estimated monthly savings.</p>
            </div>
          </div>
        </section>

        <section className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-teal-600 to-teal-400 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Monthly snapshot</p>
                  <h3 className="text-3xl font-bold mt-2">You spent</h3>
                  <p className="text-4xl font-extrabold">₹ 28,450</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Pattern</p>
                  <div className="mt-2 inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">Moderate</div>
                </div>
              </div>

              <div className="mt-6 bg-white/10 rounded-xl p-4">
                <div className="text-xs opacity-90">Category breakdown</div>
                <div className="mt-4 flex gap-4 items-end">
                  <div className="w-1/5 flex flex-col items-center">
                    <div className="w-12 bg-white/80 rounded-t-md" style={{ height: 86 }} />
                    <div className="text-xs mt-2">Food</div>
                  </div>
                  <div className="w-1/5 flex flex-col items-center">
                    <div className="w-12 bg-white/80 rounded-t-md" style={{ height: 24 }} />
                    <div className="text-xs mt-2">Travel</div>
                  </div>
                  <div className="w-1/5 flex flex-col items-center">
                    <div className="w-12 bg-white/80 rounded-t-md" style={{ height: 70 }} />
                    <div className="text-xs mt-2">Bills</div>
                  </div>
                  <div className="w-1/5 flex flex-col items-center">
                    <div className="w-12 bg-white/80 rounded-t-md" style={{ height: 60 }} />
                    <div className="text-xs mt-2">Shopping</div>
                  </div>
                  <div className="w-1/5 flex flex-col items-center">
                    <div className="w-12 bg-white/80 rounded-t-md" style={{ height: 44 }} />
                    <div className="text-xs mt-2">Entertainment</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Trend</p>
                  <h4 className="text-lg font-semibold mt-1">This month vs last</h4>
                </div>
                <div className="text-sm text-slate-600">Change: <span className="font-semibold text-emerald-600">-4.2%</span></div>
              </div>

              <div className="mt-4 h-28 bg-slate-100 rounded-lg flex items-end gap-2 p-3">
                <div className="h-8 w-6 bg-teal-100 rounded" />
                <div className="h-12 w-6 bg-teal-200 rounded" />
                <div className="h-20 w-6 bg-teal-300 rounded" />
                <div className="h-16 w-6 bg-teal-400 rounded" />
                <div className="h-10 w-6 bg-teal-500 rounded" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">Live charts and detailed analytics are available after login.</div>
        </section>
      </main>

      <section id="how" className="max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-semibold">How FinSense works</h3>
            <p className="mt-4 text-slate-600">We keep things simple: you enter or import monthly expenses, the system normalizes the data and runs a compact model to classify the pattern. We store results and show clear visual comparisons so you can act — immediately.</p>

            <ol className="mt-6 space-y-3 text-sm text-slate-600">
              <li><strong>Enter expenses:</strong> Add category-wise amounts or upload a CSV.</li>
              <li><strong>Model analysis:</strong> A Decision Tree evaluates the pattern and returns a label with confidence.</li>
              <li><strong>Personal advice:</strong> We combine the result with simple heuristics to produce actionable tips.</li>
            </ol>

            <div className="mt-6 flex items-center gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <Image src="/globe.svg" alt="Local" width={28} height={28} />
              </div>
              <div>
                <p className="text-sm font-semibold">Trusted by early users</p>
                <p className="text-xs text-slate-500">Used in pilot tests to improve monthly savings awareness.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-semibold">What you get</h4>
            <ul className="mt-4 text-sm text-slate-600 space-y-2">
              <li>Per-category breakdowns and totals</li>
              <li>ML label + confidence score for each month</li>
              <li>Simple, prioritized tips to reduce waste</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="testimonials" className="max-w-7xl mx-auto w-full px-6 py-12 bg-slate-50">
        <h3 className="text-2xl font-semibold text-center">What early users say</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <p className="text-slate-700">“FinSense showed me I was overspending on subscriptions. I cancelled two and saved ₹800/month.”</p>
            <p className="mt-3 text-xs text-slate-500">— Rhea, Bengaluru</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <p className="text-slate-700">“The suggestions are practical and clear — not generic finance-speak.”</p>
            <p className="mt-3 text-xs text-slate-500">— Kunal, Pune</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <p className="text-slate-700">“Nice visuals — I finally understand where I can cut costs.”</p>
            <p className="mt-3 text-xs text-slate-500">— Sneha, Hyderabad</p>
          </div>
        </div>
      </section>

      {/* Footer provided by shared Footer component in layout */}
    </div>
  );
}
