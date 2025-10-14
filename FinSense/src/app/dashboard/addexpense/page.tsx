"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddExpense() {
  const router = useRouter();
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState<string>("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("Food");
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!amount || Number(amount) <= 0 || !merchant.trim()) {
      setError("Please enter valid merchant and amount.");
      return;
    }

    setLoading(true);
    // Mock save: in real app POST to /api/expenses
    const expense = {
      date,
      amount: Number(amount),
      merchant,
      category,
      notes,
      recurring,
    };

    // Simulate network
    await new Promise((r) => setTimeout(r, 700));

    console.log("Saved expense (mock)", expense);
    setLoading(false);
    router.push("/dashboard");
  }



  const categories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Others"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Add expense</h2>
              <p className="text-sm text-slate-500 mt-1">Quickly log a transaction — we’ll categorize it for you.</p>
            </div>
          </div>

          {/* ...existing code... */}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-600 mb-2">Amount (INR)</label>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-3 bg-slate-50 rounded-l-lg border border-r-0 border-slate-200">₹</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="flex-1 px-3 py-3 rounded-r-lg border border-slate-200 text-2xl font-semibold" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-2">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 w-full" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-2">Merchant</label>
              <input value={merchant} onChange={(e) => setMerchant(e.target.value)} placeholder="e.g., BigMart" className="w-full px-3 py-3 rounded-lg border border-slate-200" />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-full md:w-auto text-xs text-slate-600">Category</div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button type="button" key={c} onClick={() => setCategory(c)} className={`px-3 py-2 rounded-full text-sm ${category === c ? 'bg-teal-500 text-white' : 'bg-slate-50 text-slate-700'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-2">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full px-3 py-3 rounded-lg border border-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <label className="flex items-center gap-3">
                <input id="rec" type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
                <span className="text-sm text-slate-600">Mark as recurring</span>
              </label>
            
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg">
                {loading ? "Saving..." : "Save expense"}
              </button>
              <button type="button" onClick={() => router.push('/dashboard')} className="px-4 py-2 rounded-lg border border-slate-200">Cancel</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
