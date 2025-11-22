"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface CategoryBudgets {
  food: number;
  travel: number;
  bills: number;
  shopping: number;
  entertainment: number;
  others: number;
}

interface Plan {
  _id?: string;
  month: string;
  totalBudget: number;
  categoryBudgets: CategoryBudgets;
  createdAt?: string;
  updatedAt?: string;
}

export default function PlanMonth() {
  const router = useRouter();
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM (editing/active month)
  const categories = useMemo(() => ["food", "travel", "bills", "shopping", "entertainment", "others"], []);
  const [totalBudget, setTotalBudget] = useState<number | "">("");
  const [catBudgets, setCatBudgets] = useState<Record<string, number | "">>(() => {
    const obj: Record<string, number | ""> = {};
    ["food", "travel", "bills", "shopping", "entertainment", "others"].forEach((c) => (obj[c] = ""));
    return obj;
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedPlans, setSavedPlans] = useState<Plan[]>([]);
  const [activeSidebar, setActiveSidebar] = useState<string | null>(null);
  const [copySource, setCopySource] = useState<string>("");

  // Get JWT token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Shared function to fetch all plans
  const fetchAllPlans = useCallback(async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/auth/plan-months', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSavedPlans(data.plans || []);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }, []);

  // Load all plans on component mount
  useEffect(() => {
    fetchAllPlans();
  }, [fetchAllPlans]);

  // Load specific plan when month changes
  useEffect(() => {
    const fetchPlanByMonth = async (monthToFetch: string) => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const response = await fetch(`http://localhost:5000/api/auth/plan-month/${monthToFetch}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const plan = data.plan;
          setTotalBudget(plan.totalBudget);
          setCatBudgets(plan.categoryBudgets || {});
        } else {
          // Plan doesn't exist for this month, reset form
          setTotalBudget("");
          setCatBudgets(() => {
            const obj: Record<string, number | ""> = {};
            categories.forEach((c) => (obj[c] = ""));
            return obj;
          });
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
      }
    };

    fetchPlanByMonth(month);
  }, [month, categories]);

  const sumCat = useMemo(() => {
    return categories.reduce((s, c) => s + (Number(catBudgets[c] || 0) || 0), 0);
  }, [catBudgets, categories]);

  function updateCat(c: string, v: string) {
    const num = v === "" ? "" : Number(v);
    setCatBudgets((prev) => ({ ...prev, [c]: num }));
  }

  async function handleSave() {
    setError(null);
    if (totalBudget === "" || Number(totalBudget) <= 0) {
      setError("Please enter a valid total budget.");
      return;
    }
    if (sumCat > Number(totalBudget)) {
      setError("Category budgets total exceeds overall budget.");
      return;
    }

    setSaving(true);
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Please login to save plans");
        setSaving(false);
        return;
      }

      const categoryBudgets: CategoryBudgets = {
        food: Number(catBudgets.food || 0),
        travel: Number(catBudgets.travel || 0),
        bills: Number(catBudgets.bills || 0),
        shopping: Number(catBudgets.shopping || 0),
        entertainment: Number(catBudgets.entertainment || 0),
        others: Number(catBudgets.others || 0),
      };

      const response = await fetch('http://localhost:5000/api/auth/plan-month', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month,
          totalBudget: Number(totalBudget),
          categoryBudgets,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Plan saved:', data.message);
        // Refresh the plans list
        await fetchAllPlans();
        setTimeout(() => {
          setSaving(false);
          router.push('/dashboard');
        }, 600);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save plan');
        setSaving(false);
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      setError('Failed to save plan');
      setSaving(false);
    }
  }

  function loadPlanIntoEditor(m: string) {
    setMonth(m);
    setActiveSidebar(m);
    // fetchPlanByMonth will be called automatically by useEffect when month changes
  }

  async function handleDeletePlan() {
    // confirm deletion
    if (!confirm(`Delete plan for ${new Date(month + "-01").toLocaleString(undefined, { month: 'long', year: 'numeric' })}? This cannot be undone.`)) return;
    
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Please login to delete plans");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/auth/plan-month/${month}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refresh the plans list
        await fetchAllPlans();
        
        // clear editor and active selection
        const today = new Date().toISOString().slice(0, 7);
        setMonth(today);
        setTotalBudget("");
        setCatBudgets(() => {
          const o: Record<string, number | ""> = {};
          categories.forEach((c) => (o[c] = ""));
          return o;
        });
        setActiveSidebar(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
      setError('Failed to delete plan');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Plan your month</h2>
              <p className="text-sm text-slate-500 mt-1">Set an overall spending target and split it across categories. Select a saved plan from the left to load it.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="hidden md:block md:col-span-1">
              <div className="sticky top-6">
                <h4 className="text-sm font-semibold mb-3">Saved plans</h4>
                <div className="space-y-2">
                  <button onClick={() => {
                    const today = new Date().toISOString().slice(0,7);
                    setMonth(today);
                    setTotalBudget("");
                    setCatBudgets(() => {
                      const o: Record<string, number | ""> = {};
                      categories.forEach(c => (o[c] = ""));
                      return o;
                    });
                    setActiveSidebar(null);
                  }} className={`w-full text-left px-3 py-2 rounded-lg ${activeSidebar===null? 'bg-slate-100': 'bg-white'} border`}>+ New plan</button>
                  {/* Copy UI shown when New plan is active */}
                  {activeSidebar === null && (
                    <div className="mt-2">
                      <label className="block text-xs text-slate-500 mb-1">Copy from existing</label>
                      <div className="flex gap-2">
                        <select value={copySource} onChange={(e) => setCopySource(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm">
                          <option value="">Select month</option>
                          {savedPlans.map((p) => (
                            <option key={p.month} value={p.month}>{new Date(p.month + "-01").toLocaleString(undefined, { month: 'short', year: 'numeric' })} — ₹ {p.totalBudget.toLocaleString()}</option>
                          ))}
                        </select>
                        <button onClick={() => {
                          if (!copySource) return;
                          const sourcePlan = savedPlans.find(p => p.month === copySource);
                          if (sourcePlan) {
                            setTotalBudget(sourcePlan.totalBudget);
                            setCatBudgets({
                              food: sourcePlan.categoryBudgets?.food || "",
                              travel: sourcePlan.categoryBudgets?.travel || "",
                              bills: sourcePlan.categoryBudgets?.bills || "",
                              shopping: sourcePlan.categoryBudgets?.shopping || "",
                              entertainment: sourcePlan.categoryBudgets?.entertainment || "",
                              others: sourcePlan.categoryBudgets?.others || "",
                            });
                            setActiveSidebar(null);
                          }
                        }} className={`px-3 py-2 rounded-lg text-sm ${!copySource ? 'bg-slate-200 text-slate-400' : 'bg-white border'}`} disabled={!copySource}>Copy</button>
                      </div>
                    </div>
                  )}
                  {savedPlans.length === 0 && <div className="text-xs text-slate-500">No saved plans yet.</div>}
                  {savedPlans.map((p) => (
                    <button key={p.month} onClick={() => loadPlanIntoEditor(p.month)} className={`w-full text-left px-3 py-2 rounded-lg border flex items-center justify-between ${activeSidebar===p.month? 'bg-teal-50 border-teal-200': 'bg-white'}`}>
                      <div>
                        <div className="text-sm font-medium">{new Date(p.month + "-01").toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                        <div className="text-xs text-slate-500">₹ {p.totalBudget.toLocaleString()}</div>
                      </div>
                      <div className="text-xs text-slate-400">View</div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main editor: spans 3 columns on md */}
            <section className="md:col-span-3">
              <div className="mt-0 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-600 mb-2">Select month</label>
                  <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-500" />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-2">Total budget (INR)</label>
                  <input type="number" value={typeof totalBudget === 'number' ? totalBudget : ''} onChange={(e) => setTotalBudget(e.target.value === "" ? "" : Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-500" />
                </div>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold">Category budgets</h3>
                    <p className="text-xs text-slate-500 mt-1">Distribute your total budget across categories.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Remaining</div>
                    <div className="text-xl font-semibold">₹ {totalBudget === "" ? 0 : Math.max(0, Number(totalBudget) - sumCat).toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-slate-200 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-slate-500">Allocated</div>
                      <div className="text-lg font-semibold">₹ {sumCat.toLocaleString()}</div>
                    </div>
                    <div className="w-48">
                      <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                        <div className="h-2 bg-rose-400" style={{ width: `${totalBudget === "" ? 0 : Math.min(100, (sumCat / Number(totalBudget)) * 100)}%` }} />
                      </div>
                      <div className="text-xs text-slate-500 text-right mt-1">{totalBudget === "" ? 0 : Math.round((sumCat / Number(totalBudget)) * 100)}% allocated</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => {
                      // even distribute: split total equally among categories
                      if (totalBudget === "" || Number(totalBudget) <= 0) return;
                      const per = Math.floor(Number(totalBudget) / categories.length);
                      const next: Record<string, number | ""> = {};
                      categories.forEach((c) => (next[c] = per));
                      setCatBudgets(next);
                    }} className="px-3 py-1 text-sm bg-white rounded border">Evenly distribute</button>
                    <button onClick={() => {
                      // lightweight proportional distribution: 25% Food, then weighted split rest
                      if (totalBudget === "" || Number(totalBudget) <= 0) return;
                      const t = Number(totalBudget);
                      const next: Record<string, number | ""> = {};
                      const weights: Record<string, number> = { 
                        food: 0.25, 
                        travel: 0.15, 
                        bills: 0.2, 
                        shopping: 0.15, 
                        entertainment: 0.15, 
                        others: 0.1 
                      };
                      categories.forEach((c) => (next[c] = Math.round((weights[c] || 0.1) * t)));
                      setCatBudgets(next);
                    }} className="px-3 py-1 text-sm bg-white rounded border">Auto-distribute</button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((c, index) => {
                    const categoryLabel = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Others"][index];
                    const val = typeof catBudgets[c] === 'number' ? catBudgets[c] : 0;
                    const pct = totalBudget === "" || Number(totalBudget) === 0 ? 0 : Math.round((val / Number(totalBudget)) * 100);
                    return (
                      <div key={c} className="p-3 rounded-lg bg-white border border-slate-100 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium">{categoryLabel}</div>
                            <div className="text-xs text-slate-400">{pct}%</div>
                          </div>
                          <div className="text-xs text-slate-500">Suggested: ₹ {Math.round((Number(totalBudget || 0) * 0.15))}</div>
                        </div>
                        <div className="w-36">
                          <input type="number" value={typeof catBudgets[c] === 'number' ? catBudgets[c] : ''} onChange={(e) => updateCat(c, e.target.value)} className="w-full px-3 py-2 rounded-lg border-1 border-gray-500" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {error && <div className="text-sm text-red-600 mt-4">{error}</div>}

              <div className="mt-6 flex items-center gap-3">
                <button onClick={handleSave} className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow">
                  {saving ? 'Saving...' : 'Save plan'}
                </button>
                {/* Delete button replaces previous Cancel action. Disabled when there is no saved plan for current month. */}
                {/** compute whether current month has a saved plan */}
                {(() => {
                  const hasPlan = savedPlans.some((p) => p.month === month);
                  return (
                    <button onClick={handleDeletePlan} disabled={!hasPlan} className={`px-4 py-2 rounded-lg border ${hasPlan ? 'border-red-400 text-red-600 hover:bg-red-50' : 'border-slate-200 text-slate-400'}`}>
                      Delete plan
                    </button>
                  );
                })()}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
