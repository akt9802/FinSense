"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { apiClient } from "@/utils/apiClient";
import { 
  FiDollarSign, 
  FiCalendar, 
  FiFileText, 
  FiSave, 
  FiX, 
  FiRefreshCw, 
  FiShoppingCart,
  FiShoppingBag,
  FiCoffee,
  FiMapPin,
  FiActivity,
  FiMonitor,
  FiPieChart,
  FiPlus,
  FiCheckCircle
} from "react-icons/fi";

const API_BASE_URL = "";

const categoryIconMap: Record<string, any> = {
  Food: FiCoffee,
  Travel: FiMapPin,
  Bills: FiActivity,
  Shopping: FiShoppingBag,
  Entertainment: FiMonitor,
  Others: FiPieChart
};

export default function AddExpense() {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState<string>("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("Food");
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recurringExpenses, setRecurringExpenses] = useState<Array<{ _id: string; amount: number; merchant: string; category: string }>>([]);
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
        const response = await apiClient(`${API_BASE_URL}/api/recurringexpenses`, {
          method: "GET",
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data?.error || "Failed to fetch recurring expenses.");
          return;
        }

        setRecurringExpenses((data.recurringExpenses || []).map((expense: { _id: string; amount: number; merchant: string; category: string }) => ({
          ...expense,
          _id: expense._id,
        })));
      } catch {
        setError("An unexpected error occurred.");
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

      const expenseData = {
        userId, // Include userId in the payload
        date,
        amount: Number(amount),
        merchant,
        category,
        notes,
        recurring,
      };

      // API call to save the expense to the backend
      await axios.post(
        `${API_BASE_URL}/api/addexpense`,
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (recurring) {
        setRecurringExpenses((prev) => [
          ...prev,
          { _id: "temp-id", amount: Number(amount), merchant, category },
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

  async function removeRecurringExpense(index: number, expenseId: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await apiClient(`${API_BASE_URL}/api/update-recurring/${expenseId}`, {
        method: "PUT",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data?.error || "Failed to update recurring expense.");
        return;
      }

      setRecurringExpenses((prev) => prev.filter((_, i) => i !== index));
    } catch {
      setError("An unexpected error occurred.");
    }
  }

  const categories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Others"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 shadow-lg shadow-teal-500/30 flex items-center justify-center text-white text-2xl font-bold tracking-tighter ring-4 ring-teal-50">
              <FiPlus strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">Add an Expense</h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">Quickly log a transaction. We'll automatically build your analytics.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar for Recurring */}
          <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-6">
              <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                    <FiRefreshCw size={18} />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">Recurring logs</h4>
                </div>
                <p className="text-xs font-semibold text-slate-400 mb-6 uppercase tracking-wide">Processed Automatically</p>
                
                <div className="space-y-3">
                  {recurringExpenses.length === 0 && (
                    <div className="text-sm font-medium text-slate-400 p-4 text-center bg-slate-50 rounded-xl">No recurring expenses yet.</div>
                  )}
                  {recurringExpenses.map((expense, index) => {
                    const CatIcon = categoryIconMap[expense.category] || FiShoppingCart;
                    return (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between group hover:border-teal-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                             <CatIcon size={14} />
                          </div>
                          <div className="truncate pr-2">
                            <div className="text-sm font-bold text-slate-700 truncate">{expense.merchant}</div>
                            <div className="text-xs font-semibold text-slate-500 mt-0.5">₹{expense.amount.toLocaleString()}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeRecurringExpense(index, expense._id)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-200 shrink-0 transition-colors"
                          aria-label="Remove recurring expense"
                        >
                          <FiX size={12} strokeWidth={3} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Form */}
          <section className="md:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 xl:p-10">
              <div className="mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2"><FiFileText className="text-teal-500" /> Transaction Details</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Please fill in the information below.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <FiDollarSign /> Amount (INR)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-bold text-lg">₹</span>
                      </div>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xl font-extrabold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <FiCalendar /> Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <FiShoppingCart /> Merchant Name
                  </label>
                  <input
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    placeholder="e.g., BigMart, Uber, Amazon"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-1">
                    <FiPieChart /> Category Allocation
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((c) => {
                      const Icon = categoryIconMap[c] || FiPieChart;
                      const isActive = category === c;
                      return (
                        <button
                          type="button"
                          key={c}
                          onClick={() => setCategory(c)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                            isActive 
                              ? "bg-teal-600 text-white shadow-teal-500/30 scale-105" 
                              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                    <FiFileText /> Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Describe what you bought..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm resize-none"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="flex items-center gap-4 cursor-pointer group w-fit">
                    <div className="relative flex items-center justify-center">
                      <input
                        id="rec"
                        type="checkbox"
                        checked={recurring}
                        onChange={(e) => setRecurring(e.target.checked)}
                        className="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded-md bg-white checked:bg-teal-500 checked:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition-all cursor-pointer"
                      />
                      <FiCheckCircle size={16} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors">Mark as recurring expense</div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5">We will process this automatically going forward.</div>
                    </div>
                  </label>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm font-bold animate-pulse">
                     <FiActivity size={18} className="shrink-0" />
                     {error}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100 flex items-center gap-4 flex-wrap">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/20 transform hover:-translate-y-0.5 transition-all outline-none md:w-auto w-full disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <FiSave size={18} />
                    {loading ? "Processing..." : "Log Expense"}
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
                    className="px-6 py-3 rounded-xl font-bold border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all text-center md:w-auto w-full outline-none"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
        
        {/* Popup Notification */}
        <div className={`fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform ${showPopup ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
           <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
             <FiCheckCircle size={18} />
           </div>
           <div>
             <div className="text-sm font-bold tracking-wide">Expense Saved!</div>
             <div className="text-xs text-slate-400 mt-0.5 font-medium">Your transaction has been recorded.</div>
           </div>
        </div>
        
      </main>
    </div>
  );
}
