"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all fields.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the terms.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        setLoading(false);
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  const canSubmit = Boolean(name.trim() && email.trim() && password && password.length >= 6 && agreed && !loading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Illustration / Brand panel */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 p-10 bg-gradient-to-b from-teal-600 to-teal-400 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Image src="/logo-mark.svg" alt="FinSense" width={48} height={48} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Welcome to FinSense</h3>
              <p className="text-sm opacity-90">Smart, simple expense insights — powered by lightweight ML.</p>
            </div>
          </div>

          <div className="w-full bg-white/10 rounded-xl p-4">
            <p className="text-xs opacity-90">Monthly snapshot (example)</p>
            <div className="mt-3 flex items-end gap-2 h-24">
              <div className="w-6 rounded bg-white/80" style={{ height: 70 }} />
              <div className="w-6 rounded bg-white/80" style={{ height: 110 }} />
              <div className="w-6 rounded bg-white/80" style={{ height: 90 }} />
              <div className="w-6 rounded bg-white/80" style={{ height: 50 }} />
            </div>
          </div>

          <p className="text-xs text-white/90 max-w-xs text-center">Create an account to unlock personalized suggestions, category breakdowns and simple tips to save every month.</p>
        </div>

        {/* Form panel */}
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white text-black rounded-full p-1 ring-1 ring-slate-100">
              <Image src="/logo-mark.svg" alt="FinSense" width={40} height={40} />
            </div>
            <div>
              <h2 className="text-xl text-black font-semibold">Create your FinSense account</h2>
              <p className="text-sm text-slate-500">Start tracking and get personalized insights.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-600 mb-2">Full name</label>
              <div className="relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-gray-600 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 transition placeholder:text-gray-500 placeholder:text-sm"
                  placeholder="Write your full name..."
                  aria-label="Full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-gray-600 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 transition placeholder:text-gray-500 placeholder:text-sm"
                  placeholder="enter your email here"
                  aria-label="Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-600 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 transition pr-12 placeholder:text-gray-500 placeholder:text-sm"
                  placeholder="At least 6 characters"
                  aria-label="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.94 6.11A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.02 10.02 0 01-1.8 3.02M9.88 9.88A3 3 0 0114.12 14.12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                </button>
              </div>

              <div className="mt-2 text-xs text-slate-500">
                Password must be at least 6 characters. Use a mix of letters, numbers, and symbols for a stronger password.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 text-teal-600 rounded" />
              <label htmlFor="terms" className="text-sm text-slate-600">I agree to the <a href="#" className="text-teal-600 hover:underline">terms and privacy</a></label>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && (
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full inline-flex items-center justify-center ${canSubmit ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-md hover:from-teal-600 hover:to-teal-500" : "bg-slate-100 text-slate-400"} px-4 py-3 rounded-lg font-medium transition disabled:opacity-80`}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-600">
            Already have an account? <a className="text-teal-600 hover:underline" href="/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
