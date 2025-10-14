"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function PlanMonth() {
  const router = useRouter();
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM (editing/active month)
  const categories = useMemo(() => ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Others"], []);
  const [totalBudget, setTotalBudget] = useState<number | "">("");
  const [catBudgets, setCatBudgets] = useState<Record<string, number | "">>(() => {
    const obj: Record<string, number | ""> = {};
    ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Others"].forEach((c) => (obj[c] = ""));
    return obj;
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedPlans, setSavedPlans] = useState<Array<{ month: string; total: number; categories: Record<string, number | ""> }>>([]);
  const [activeSidebar, setActiveSidebar] = useState<string | null>(null);
  const [copySource, setCopySource] = useState<string>("");

  useEffect(() => {
    // load saved plan for selected month
    try {
      const raw = localStorage.getItem(`plan:${month}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        setTotalBudget(parsed.total ?? "");
        setCatBudgets(parsed.categories ?? {});
      }
    } catch {
      // ignore parse errors
    }
  }, [month]);

  // load list of saved plans for sidebar
  useEffect(() => {
    try {
      const plans: Array<{ month: string; total: number; categories: Record<string, number | ""> }> = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || "";
        if (key.startsWith("plan:")) {
          const m = key.replace("plan:", "");
          try {
            const raw = localStorage.getItem(key) as string;
            const parsed = JSON.parse(raw);
            plans.push({ month: m, total: parsed.total ?? 0, categories: parsed.categories ?? {} });
          } catch {
            // skip
          }
        }
      }
      // sort descending by month and set list
      plans.sort((a, b) => (a.month < b.month ? 1 : -1));
      setSavedPlans(plans);
    } catch {
      // ignore
    }
  }, []);

  const sumCat = useMemo(() => {
    return categories.reduce((s, c) => s + (Number(catBudgets[c] || 0) || 0), 0);
  }, [catBudgets, categories]);

  function updateCat(c: string, v: string) {
    const num = v === "" ? "" : Number(v);
    setCatBudgets((prev) => ({ ...prev, [c]: num }));
  }

  function handleSave() {
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
    const payload = { month, total: Number(totalBudget), categories: catBudgets };
    // save to localStorage as mock persistence
    localStorage.setItem(`plan:${month}`, JSON.stringify(payload));
    // refresh sidebar list
    setSavedPlans((prev) => {
      const exists = prev.find((p) => p.month === month);
      if (exists) {
        return prev.map((p) => (p.month === month ? { month, total: Number(totalBudget), categories: catBudgets } : p));
      }
      return [{ month, total: Number(totalBudget), categories: catBudgets }, ...prev].sort((a, b) => (a.month < b.month ? 1 : -1));
    });
    setTimeout(() => {
      setSaving(false);
      router.push('/dashboard');
    }, 600);
  }

  function loadPlanIntoEditor(m: string) {
    try {
      const raw = localStorage.getItem(`plan:${m}`);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setMonth(m);
      setTotalBudget(parsed.total ?? "");
      setCatBudgets(parsed.categories ?? {});
      setActiveSidebar(m);
    } catch {
      // ignore
    }
  }

  function handleDeletePlan() {
    // confirm deletion
    if (!confirm(`Delete plan for ${new Date(month + "-01").toLocaleString(undefined, { month: 'long', year: 'numeric' })}? This cannot be undone.`)) return;
    try {
      localStorage.removeItem(`plan:${month}`);
    } catch {
      // ignore
    }
    // update sidebar list
    setSavedPlans((prev) => prev.filter((p) => p.month !== month));
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
                            <option key={p.month} value={p.month}>{new Date(p.month + "-01").toLocaleString(undefined, { month: 'short', year: 'numeric' })} — ₹ {p.total.toLocaleString()}</option>
                          ))}
                        </select>
                        <button onClick={() => {
                          if (!copySource) return;
                          try {
                            const raw = localStorage.getItem(`plan:${copySource}`);
                            if (!raw) return;
                            const parsed = JSON.parse(raw);
                            // copy values into editor but keep current `month` (user can set month for new plan)
                            setTotalBudget(parsed.total ?? "");
                            setCatBudgets(parsed.categories ?? {});
                            // keep New plan active
                            setActiveSidebar(null);
                          } catch {
                            // ignore
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
                        <div className="text-xs text-slate-500">₹ {p.total.toLocaleString()}</div>
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
                      // lightweight proportional distribution: 20% Food, then equal split rest
                      if (totalBudget === "" || Number(totalBudget) <= 0) return;
                      const t = Number(totalBudget);
                      const next: Record<string, number | ""> = {};
                      const weights: Record<string, number> = { Food: 0.25, Travel: 0.15, Bills: 0.2, Shopping: 0.15, Entertainment: 0.15, Others: 0.1 };
                      categories.forEach((c) => (next[c] = Math.round((weights[c] || 0.1) * t)));
                      setCatBudgets(next);
                    }} className="px-3 py-1 text-sm bg-white rounded border">Auto-distribute</button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((c) => {
                    const val = typeof catBudgets[c] === 'number' ? catBudgets[c] : 0;
                    const pct = totalBudget === "" || Number(totalBudget) === 0 ? 0 : Math.round((val / Number(totalBudget)) * 100);
                    return (
                      <div key={c} className="p-3 rounded-lg bg-white border border-slate-100 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium">{c}</div>
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
