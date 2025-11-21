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

      <section className="max-w-7xl mx-auto w-full px-6 py-16 bg-white">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Powerful Features for Smart Financial Management</h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">Discover all the tools you need to take control of your finances and make informed decisions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Expense Tracking</h4>
            <p className="text-slate-600">Track every expense with detailed categorization, merchant information, and notes. Set up recurring expenses for automatic monitoring.</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Budget Planning</h4>
            <p className="text-slate-600">Create monthly budgets with category-wise allocation. Track your progress and get insights on spending vs. planned budgets.</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Smart Analytics</h4>
            <p className="text-slate-600">AI-powered insights classify your spending patterns and provide personalized recommendations to improve your financial health.</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Recurring Management</h4>
            <p className="text-slate-600">Automatically track recurring expenses like subscriptions, rent, and utilities. Never miss a payment again.</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Profile Management</h4>
            <p className="text-slate-600">Manage your personal profile, preferences, and account settings. Your data is secure and always under your control.</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Smart Insights</h4>
            <p className="text-slate-600">Get personalized tips and recommendations based on your spending patterns. Learn how to optimize your financial habits.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Why Choose FinSense?</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Modern Technology Stack</h4>
                  <p className="text-slate-600">Built with Next.js 15, React 19, TypeScript, and MongoDB. Powered by cutting-edge web technologies for optimal performance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Real-time Synchronization</h4>
                  <p className="text-slate-600">Access your data from anywhere. Changes sync instantly across all your devices for a seamless experience.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Intuitive User Interface</h4>
                  <p className="text-slate-600">Clean, modern design that makes financial management simple and enjoyable. No complex jargon or confusing layouts.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Free to Get Started</h4>
                  <p className="text-slate-600">Start tracking your expenses and planning budgets immediately. No hidden fees or premium features locked behind paywalls.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl">
            <h4 className="text-2xl font-bold mb-6 text-center">Get Started in Minutes</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div>
                  <h5 className="font-semibold">Create Account</h5>
                  <p className="text-sm text-slate-600">Sign up with just your name, email, and password</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div>
                  <h5 className="font-semibold">Add Your First Expense</h5>
                  <p className="text-sm text-slate-600">Start by adding a few recent expenses to see how it works</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div>
                  <h5 className="font-semibold">Set Your Budget</h5>
                  <p className="text-sm text-slate-600">Plan your monthly budget and see instant insights</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <div>
                  <h5 className="font-semibold">Get Smart Insights</h5>
                  <p className="text-sm text-slate-600">Receive personalized recommendations and track your progress</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/signup" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium shadow transform hover:-translate-y-0.5 transition">
                Start Your Journey
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 py-16 bg-white">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">Find answers to common questions about FinSense and how it can help you manage your finances better</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-semibold mb-2">Is my financial data secure?</h4>
              <p className="text-slate-600 text-sm">Yes, we use secure authentication with JWT tokens and password encryption. Your data is stored safely and never shared with third parties.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-semibold mb-2">Can I access FinSense on mobile?</h4>
              <p className="text-slate-600 text-sm">Absolutely! FinSense is fully responsive and works seamlessly on all devices - desktop, tablet, and mobile phones.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-semibold mb-2">How does the expense categorization work?</h4>
              <p className="text-slate-600 text-sm">We provide predefined categories like Food, Travel, Bills, Shopping, Entertainment, and Others. You can easily assign expenses to these categories when adding them.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-semibold mb-2">What makes FinSense different?</h4>
              <p className="text-slate-600 text-sm">Unlike other financial apps, FinSense focuses on simplicity and actionable insights. We use ML to provide personalized recommendations without overwhelming complexity.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-semibold mb-2">Can I set up recurring expenses?</h4>
              <p className="text-slate-600 text-sm">Yes! You can mark expenses as recurring when adding them. This helps you track regular payments like rent, subscriptions, and utilities automatically.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-semibold mb-2">Can I export my data?</h4>
              <p className="text-slate-600 text-sm">Yes, all your expense data can be exported for backup or analysis. You maintain full control over your financial information.</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl">
              <h4 className="font-semibold mb-2">What technologies power FinSense?</h4>
              <p className="text-slate-600 text-sm">FinSense is built with modern technologies including Next.js 15, React 19, TypeScript, Node.js, Express, and MongoDB for reliability and performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto w-full px-6 py-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-3xl mb-16">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-4">Ready to Take Control of Your Finances?</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">Join thousands of users who are already making smarter financial decisions with FinSense. Start your journey to financial wellness today.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="inline-flex items-center gap-3 bg-white text-teal-600 px-8 py-3 rounded-lg font-medium shadow hover:shadow-lg transform hover:-translate-y-0.5 transition">
              Create Free Account
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition">
              Already have an account? Sign In
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">Next.js 15</div>
              <div className="text-sm opacity-90">Latest Framework</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">TypeScript</div>
              <div className="text-sm opacity-90">Type Safety</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">MongoDB</div>
              <div className="text-sm opacity-90">Reliable Database</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer provided by shared Footer component in layout */}
    </div>
  );
}
