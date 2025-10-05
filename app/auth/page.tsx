"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Incorrect password");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#111111]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center font-['Suisse_Intl',_sans-serif] text-2xl font-normal tracking-tight text-[#1a1a1a]">
          Sync &apos;25 Event
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-['Suisse_Intl',_sans-serif] text-sm text-[#1a1a1a]"
            >
              Enter Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-[rgba(0,0,0,0.1)] bg-white px-4 py-3 font-['Suisse_Intl',_sans-serif] text-[#1a1a1a] outline-none focus:border-[#09f309] focus:ring-2 focus:ring-[#09f309] focus:ring-opacity-20"
              placeholder="Password"
              autoFocus
              disabled={loading}
            />
          </div>
          {error && (
            <p className="font-['Suisse_Intl',_sans-serif] text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#1a1a1a] px-4 py-3 font-['Suisse_Intl',_sans-serif] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Access Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
