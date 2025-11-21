"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaUser, FaCalendarAlt, FaRedo } from "react-icons/fa";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface RecurringExpense {
  _id?: string;
  date?: string;
  amount?: number;
  merchant?: string;
  category?: string;
  notes?: string;
  recurring?: boolean;
}

export default function Profile() {
  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
    phone: "123-456-7890",
    address: "123 Main St, Springfield, USA",
    profileImage: "", // Placeholder for uploaded image
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [recurringExpenses, setRecurringExpenses] = useState<RecurringExpense[]>([]);
  const [recurringLoading, setRecurringLoading] = useState(false);
  const [recurringError, setRecurringError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(prevUser => ({
              ...prevUser,
              name: data.user.name,
              email: data.user.email
            }));
          }
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("An error occurred while fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch recurring expenses when the recurringExpenses tab is selected
  useEffect(() => {
    const fetchRecurring = async () => {
      setRecurringError("");
      setRecurringLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setRecurringError("No authentication token found");
          setRecurringExpenses([]);
          setRecurringLoading(false);
          return;
        }

        const res = await fetch(`${BACKEND_URL}/api/auth/recurringexpenses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setRecurringExpenses(Array.isArray(data.recurringExpenses) ? data.recurringExpenses : []);
        } else {
          const err = await res.json().catch(() => ({}));
          setRecurringError(err.error || "Failed to fetch recurring expenses");
        }
      } catch (err) {
        console.error("Error fetching recurring expenses:", err);
        setRecurringError("An error occurred while fetching recurring expenses");
      } finally {
        setRecurringLoading(false);
      }
    };

    if (activeTab === "recurringExpenses") {
      fetchRecurring();
    }
  }, [activeTab]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prevUser) => ({ ...prevUser, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading profile...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center text-red-600">
                  <p className="text-lg font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-teal-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md overflow-hidden">
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800">{user.name}</h2>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-slate-500">Phone</h3>
                    <p className="text-lg font-semibold text-slate-800 mt-1">{user.phone}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-slate-500">Address</h3>
                    <p className="text-lg font-semibold text-slate-800 mt-1">{user.address}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-slate-500">Upload Profile Image</h3>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-2 text-slate-800 border-1 pl-2 rounded-[10px]"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-teal-500 transition text-lg font-medium">
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        );
      case "previousMonths":
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Previous Months Data</h2>
            <p className="text-sm text-slate-500">Here you can view your previous months&#39; financial data.</p>
            {/* Add detailed data visualization here */}
          </div>
        );
      case "recurringExpenses":
        return (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Recurring Expenses</h2>
            <p className="text-sm text-slate-500 mb-6">List of subscriptions and recurring expenses will be displayed here.</p>

            {recurringLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600">Loading recurring expenses...</p>
                </div>
              </div>
            ) : recurringError ? (
              <div className="text-red-600 p-4 rounded-md">{recurringError}</div>
            ) : recurringExpenses.length === 0 ? (
              <div className="text-slate-600 p-4">No recurring expenses found.</div>
            ) : (
              <div className="grid gap-4">
                {recurringExpenses.map((exp, idx) => (
                  <div key={exp._id || idx} className="p-4 border rounded-lg shadow-sm flex justify-between items-start">
                    <div>
                      <div className="text-sm text-slate-500">{exp.date ? new Date(exp.date).toLocaleDateString() : '—'}</div>
                      <div className="text-lg font-semibold text-slate-800">{exp.merchant || exp.category || 'Expense'}</div>
                      <div className="text-sm text-slate-500 mt-1">{exp.notes}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-800">₹{exp.amount}</div>
                      <div className="text-xs text-slate-500 mt-1">{exp.recurring ? 'Recurring' : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 flex px-32">
      <aside className="w-64 bg-white shadow-md p-6 rounded-lg h-screen">
        <nav className="space-y-4">
          <button
            className={`w-full flex items-center gap-4 text-left px-4 py-2 rounded-lg font-medium border border-slate-300 transition-all duration-200 ${
              activeTab === "profile" ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser className="text-lg" /> Profile
          </button>
          <button
            className={`w-full flex items-center gap-4 text-left px-4 py-2 rounded-lg font-medium border border-slate-300 transition-all duration-200 ${
              activeTab === "previousMonths" ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => setActiveTab("previousMonths")}
          >
            <FaCalendarAlt className="text-lg" /> Previous Months Data
          </button>
          <button
            className={`w-full flex items-center gap-4 text-left px-4 py-2 rounded-lg font-medium border border-slate-300 transition-all duration-200 ${
              activeTab === "recurringExpenses" ? "bg-teal-500 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
            onClick={() => setActiveTab("recurringExpenses")}
          >
            <FaRedo className="text-lg" /> Recurring Expenses
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}