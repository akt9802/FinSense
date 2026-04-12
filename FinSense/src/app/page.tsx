"use client";

import Link from "next/link";
import { 
  FiPieChart, 
  FiTarget, 
  FiTrendingUp, 
  FiRefreshCw, 
  FiShield, 
  FiZap 
} from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50/50 -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-teal-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 relative">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-sm font-semibold tracking-wide border border-teal-200">
              <span className="flex h-2 w-2 rounded-full bg-teal-600 animate-pulse"></span>
              Smart Financial Assistant
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Understand spending.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Make smarter choices.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              FinSense isn't just an expense tracker. We use lightweight machine learning to categorize your spending, identify patterns, and provide actionable tips—helping you save more without the stress.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transform hover:-translate-y-0.5 transition-all duration-200 text-center">
                Get Started for Free
              </Link>
              <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold shadow-sm border border-slate-200 hover:border-slate-300 transition-all duration-200 text-center">
                Sign In
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative group perspective-1000">
            {/* Mockup Dashboard UI built with CSS */}
            <div className="relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white max-w-md mx-auto shadow-2xl p-6 transform rotate-y-[0deg] lg:rotate-y-[-5deg] lg:rotate-x-[5deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out z-10">
              <div className="absolute top-4 right-4 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              
              <p className="text-sm text-slate-500 font-medium mb-1 mt-4">Monthly Snapshot</p>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-6">₹ 28,450</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-teal-50 to-white border border-teal-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                      <FiPieChart size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Pattern Analysis</p>
                      <p className="text-xs text-slate-500">Moderate Spending</p>
                    </div>
                  </div>
                  <span className="text-teal-700 font-bold bg-teal-100 border border-teal-200 px-3 py-1 rounded-full text-xs shadow-sm">Healthy</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-600">Food & Dining</span>
                    <span className="font-semibold text-slate-900">35%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-600">Travel</span>
                    <span className="font-semibold text-slate-900">15%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-5 rounded-xl shadow-inner border border-slate-700 font-medium">
                <p className="text-xs font-bold text-teal-400 mb-1 flex items-center gap-2 uppercase tracking-wide">
                  <FiZap size={14} /> AI Suggestion
                </p>
                <p className="text-sm">Cut monthly eating out by 20% to save ₹3,000.</p>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-8 -left-8 lg:-left-12 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 animate-bounce z-20" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-full">
                  <FiTrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Savings Trend</p>
                  <p className="text-lg font-bold text-slate-900">+12% this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-teal-600 font-bold tracking-wide uppercase text-sm mb-3">Core Features</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Intelligent tools to rethink your wallet.</h3>
            <p className="text-slate-600 text-lg">FinSense does the heavy lifting of categorizing expenses and spotting trends.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-teal-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-teal-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-teal-400 font-bold tracking-wide uppercase text-sm mb-3">Workflow</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">How FinSense Works</h3>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                We keep things simple: you input your spending, we analyze it instantly, and provide clear next steps. No confusing spreadsheets required.
              </p>

              <div className="space-y-10">
                {[
                  { step: '01', title: 'Enter Your Expenses', desc: 'Add category-wise amounts dynamically. Set up recurring payments.' },
                  { step: '02', title: 'Smart ML Analysis', desc: 'A Decision Tree evaluates the pattern and returns an actionable label with a confidence score.' },
                  { step: '03', title: 'Personalized Advice', desc: 'We combine the classification with simple heuristics to produce specific tips to maximize savings.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="font-mono font-bold text-teal-500 text-2xl pt-1 tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 p-8 md:p-10 rounded-[2rem] shadow-2xl relative">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-700/50">
                 <h4 className="text-xl font-semibold text-white">Live Analysis</h4>
                 <div className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 text-teal-400 rounded-full text-xs font-bold tracking-wider uppercase font-mono animate-pulse">Running</div>
               </div>
               <div className="space-y-6">
                 {[
                   { label: 'Categorization Confidence', val: '98.5%', color: 'text-white' },
                   { label: 'Spending Pattern', val: 'Healthy', color: 'text-green-400' },
                   { label: 'Risk Factor', val: 'Low Risk', color: 'text-green-400' },
                   { label: 'Recommendation Output', val: 'Increase investments by 5%', color: 'text-teal-400' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-2">
                     <span className="text-slate-400 font-medium">{stat.label}</span>
                     <span className={`font-bold ${stat.color}`}>{stat.val}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-teal-50/50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">What Early Users Say</h3>
            <p className="text-slate-600 text-lg">Real stories from people saving more with FinSense.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rhea, Bengaluru", quote: "FinSense showed me I was overspending on subscriptions. I cancelled two and saved ₹800/month." },
              { name: "Kunal, Pune", quote: "The suggestions are practical and clear — not generic finance-speak. Finally an app that makes sense." },
              { name: "Sneha, Hyderabad", quote: "Nice visuals — I finally understand where I can cut costs without sacrificing my lifestyle." }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-teal-100/50 relative hover:shadow-md transition-shadow">
                <div className="text-teal-200 mb-6 font-serif text-8xl leading-none h-10 italic">"</div>
                <p className="text-slate-700 font-medium mb-8 relative z-10 leading-relaxed text-lg">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                    {t.name[0]}
                  </div>
                  <p className="text-sm text-slate-900 font-bold">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">Frequently Asked Questions</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "Is my financial data secure?", a: "Yes, we use secure authentication with JWT tokens and password encryption. Your data is strictly private and never shared with generic third parties." },
              { q: "How does the ML categorization work?", a: "We run a lightweight decision tree model on your spending distribution to label your habits as Healthy, Moderate, or Risky with transparent confidence scores." },
              { q: "Can I set up recurring expenses?", a: "Yes! You can mark expenses as recurring. This helps you track regular payments like rent and subscriptions automatically, projecting your future spending." },
              { q: "Is FinSense free to use?", a: "Absolutely. We believe basic financial clarity and actionable insights should be accessible to everyone." },
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-100 transition-colors">
                <h4 className="font-bold text-slate-900 mb-3 text-lg">{faq.q}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-teal-900/20 relative overflow-hidden">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10 tracking-tight">Make Your Money Make Sense</h3>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
              Stop guessing where your paycheck goes. Get clarity in minutes.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="px-8 py-4 bg-white text-teal-700 hover:bg-slate-50 rounded-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95 text-center">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <FiTarget size={24} />,
    title: "Expense Classification",
    desc: "A lightweight Decision Tree model labels patterns as Healthy, Moderate or Risky with confidence scores."
  },
  {
    icon: <FiPieChart size={24} />,
    title: "Visual Breakdowns",
    desc: "Insightful charts and trend lines that make it incredibly simple to spot where your money is concentrated."
  },
  {
    icon: <FiZap size={24} />,
    title: "Actionable Advice",
    desc: "Practical tips generated based on your habits, like \"cut entertainment by 10%\" with estimated monthly savings."
  },
  {
    icon: <FiRefreshCw size={24} />,
    title: "Recurring Management",
    desc: "Automatically track recurring expenses like subscriptions and utilities to prevent accidental overspending."
  },
  {
    icon: <FiTrendingUp size={24} />,
    title: "Budget Planning",
    desc: "Create simple monthly budgets with category-wise allocation to stay ahead of your financial goals."
  },
  {
    icon: <FiShield size={24} />,
    title: "Private & Secure",
    desc: "Your data stays private. We focus on personal insights, not feeding your financial info to third parties."
  }
];
