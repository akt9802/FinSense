"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function AddExpense() {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState<string>("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("Food");
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recurringExpenses, setRecurringExpenses] = useState<Array<{ amount: number; merchant: string; category: string }>>([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  useEffect(() => {
    // Fetch recurring expenses from the backend
    async function fetchRecurringExpenses() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated.");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/recurring-expenses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecurringExpenses(response.data.recurringExpenses);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "Failed to fetch recurring expenses.");
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }

    fetchRecurringExpenses();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!amount || Number(amount) <= 0 || !merchant.trim() || !date || !category || !notes.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    try {
      // Decode the token and fetch the id field
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id; // Extract `id` from the token payload

      if (!userId) {
        setError("User ID not found in token.");
        setLoading(false);
        return;
      }

      if (recurring) {
        setRecurringExpenses((prev) => [
          ...prev,
          { amount: Number(amount), merchant, category },
        ]);
      }

      // Show popup notification
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds

      // Clear the form
      setDate(new Date().toISOString().slice(0, 10));
      setAmount("");
      setMerchant("");
      setCategory("Food");
      setNotes("");
      setRecurring(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred while saving the expense.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  function removeRecurringExpense(index: number) {
    setRecurringExpenses((prev) => prev.filter((_, i) => i !== index));
  }

  const categories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Others"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-6 bg-white rounded-lg shadow-md p-4 border border-slate-200">
              <h4 className="text-sm font-semibold mb-3 text-teal-600">Recurring Expenses</h4>
              <p className="text-xs text-slate-500 mb-3">All these items will be added at the end of the day.</p>
              <div className="space-y-3">
                {recurringExpenses.length === 0 && (
                  <div className="text-xs text-slate-500">No recurring expenses yet.</div>
                )}
                {recurringExpenses.map((expense, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-slate-50 border border-gray-400 flex items-center justify-between hover:shadow-md"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-700">{expense.merchant}</div>
                      <div className="text-xs text-slate-500">₹ {expense.amount.toLocaleString()} - {expense.category}</div>
                    </div>
                    <button
                      onClick={() => removeRecurringExpense(index)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      aria-label="Remove recurring expense"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <section className="md:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Add expense</h2>
                  <p className="text-sm text-slate-500 mt-1">Quickly log a transaction — we’ll categorize it for you.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-600 mb-2">Amount (INR)</label>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-3 bg-slate-100 rounded-l-lg border border-r-0 border-slate-200">₹</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 px-3 py-3 rounded-r-lg border border-gray-400 text-2xl font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-2">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-400 w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-2">Merchant</label>
                  <input
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    placeholder="e.g., BigMart"
                    className="w-full px-3 py-3 rounded-lg border border-gray-400"
                  />
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-full md:w-auto text-xs text-slate-600">Category</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-3 py-2 rounded-full text-sm ${
                          category === c ? "bg-teal-500 text-white" : "bg-slate-50 text-slate-700"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-2">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-3 rounded-lg border border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <label className="flex items-center gap-3">
                    <input
                      id="rec"
                      type="checkbox"
                      checked={recurring}
                      onChange={(e) => setRecurring(e.target.checked)}
                    />
                    <span className="text-sm text-slate-600">Mark as recurring</span>
                  </label>
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg"
                  >
                    {loading ? "Saving..." : "Save expense"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDate(new Date().toISOString().slice(0, 10));
                      setAmount("");
                      setMerchant("");
                      setCategory("Food");
                      setNotes("");
                      setRecurring(false);
                    }}
                    className="px-4 py-2 rounded-lg border border-slate-200"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
        {/* Popup Notification */}
        {showPopup && (
          <div className="fixed bottom-6 right-6 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Expense saved successfully!
          </div>
        )}
      </main>
    </div>
  );
}
