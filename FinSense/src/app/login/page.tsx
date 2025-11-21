"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      console.log("Sending request...");
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Request sent");

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      setSuccess("Login successful! Redirecting...");
      
      // Dispatch custom event to notify header about authentication
      window.dispatchEvent(new CustomEvent("userAuthenticated"));
      
      setTimeout(() => {
        setLoading(false); // Ensure loading is reset before redirect
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left features panel (hidden on small screens) */}
        <div className="hidden md:flex flex-col justify-center gap-6 p-8 bg-gradient-to-br from-teal-600 to-teal-400 text-white">
          <h3 className="text-2xl font-semibold">Why people love FinSense</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <div className="font-medium">Smart spending insights</div>
                <div className="text-sm opacity-90">Auto-categorize and highlight saving opportunities.</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2v4h6v-4c0-1.105-1.343-2-3-2zM6 20h12" />
                </svg>
              </span>
              <div>
                <div className="font-medium">Goal-based projections</div>
                <div className="text-sm opacity-90">See how small changes affect long-term goals.</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a4 4 0 004 4h10a4 4 0 004-4V7" />
                </svg>
              </span>
              <div>
                <div className="font-medium">Privacy-first</div>
                <div className="text-sm opacity-90">We keep your financial data secure and private.</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right: form */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white rounded-full p-1 ring-1 ring-slate-100">
              <Image src="/logo-mark.svg" alt="FinSense" width={40} height={40} />
            </div>
            <div>
              <h2 className="text-2xl text-black font-semibold">Welcome back</h2>
              <p className="text-sm text-slate-500">Sign in to access your dashboard.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs text-slate-600 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-shadow"
                placeholder="you@example.com"
                aria-label="Email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs text-slate-600 mb-2">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-shadow pr-12"
                  placeholder="Your password"
                  aria-label="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center px-2 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5.523 0-10-4.477-10-10a9.97 9.97 0 0 1 1.175-4.375M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 block" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1.05 12a10.02 10.02 0 0 1 1.53-3.46A10.025 10.025 0 0 1 12 3c5.523 0 10 4.477 10 9 0 1.18-.23 2.31-.66 3.33M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-emerald-600">{success}</div>}

            <button
              type="submit"
              className={`w-full inline-flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-400 text-white px-4 py-3 rounded-lg font-medium shadow hover:brightness-95 transform hover:-translate-y-0.5 transition ${loading ? 'opacity-80 cursor-wait' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <div>
              Don&apos;t have an account? <Link className="text-teal-600 hover:underline" href="/signup">Create account</Link>
            </div>
            <a href="#" className="text-slate-500 hover:underline">Forgot?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
