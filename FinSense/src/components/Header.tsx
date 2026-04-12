"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL = "";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("Loading...");
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${BACKEND_URL}/api/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUsername(data.user.name);
          }
        } else {
          // If profile fetch fails, token might be invalid
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUsername("Guest");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUsername("Guest");
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile();
    }

    const handleUserAuthenticated = () => {
      const updatedToken = localStorage.getItem("token");
      if (updatedToken) {
        setIsAuthenticated(true);
        fetchUserProfile();
      }
    };

    window.addEventListener("userAuthenticated", handleUserAuthenticated);

    return () => {
      window.removeEventListener("userAuthenticated", handleUserAuthenticated);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername("Guest");
    setShowDropdown(false);
    router.push("/");
  };

  return (
    <>
      {isAuthenticated ? (
        // Authenticated User Header - Dashboard Style
        <header className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg z-50">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
              {/* Logo and App Name */}
              <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
                <div className="bg-white rounded-full p-2 shadow-md flex-shrink-0">
                  <Image src="/logo-mark.svg" alt="FinSense" width={32} height={32} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">FinSense</h1>
                  <p className="text-xs text-slate-300">Dashboard</p>
                </div>
              </Link>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center gap-8">
                <Link 
                  href="/dashboard" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-teal-400"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/addexpense" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-teal-400"
                >
                  Add Expense
                </Link>
                <Link 
                  href="/dashboard/planmonth" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-teal-400"
                >
                  Plan Budget
                </Link>
              </nav>

              {/* User Menu */}
              <div className="relative flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-white">{username}</p>
                  <p className="text-xs text-slate-300">Welcome back!</p>
                </div>
                <div
                  className="bg-gradient-to-r from-teal-500 to-teal-400 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  onClick={toggleDropdown}
                >
                  <span className="text-sm font-bold text-white">
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-3 w-52 bg-white text-slate-800 border border-slate-200 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">{username}</p>
                        <p className="text-xs text-slate-500">Manage your account</p>
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        👤 Profile Settings
                      </Link>
                      <Link
                        href="/dashboard/chats"
                        className="flex items-center px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        💬 Chat with us
                      </Link>
                      <div className="border-t border-slate-100 mt-1">
                        <div
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                          onClick={handleLogout}
                        >
                          🚪 Logout
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      ) : (
        // Non-Authenticated User Header - Landing Style (Same color scheme as authenticated)
        <header className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg z-50">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
              {/* Brand Section */}
              <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
                <div className="bg-white rounded-full p-2 shadow-md flex-shrink-0">
                  <Image src="/logo-mark.svg" alt="FinSense" width={32} height={32} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">FinSense</h1>
                  <p className="text-xs text-slate-300">Intelligent Financial Analytics Platform</p>
                </div>
              </Link>

              {/* Authentication Actions */}
              <div className="flex items-center gap-4">
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-700"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Free
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
