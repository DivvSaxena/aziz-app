"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/yay");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">AzizApp</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center gap-10 px-4">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-800">
            Hey Aziz! 👋
          </h2>
          <p className="text-gray-500 mt-2 text-lg">Welcome back. What are we watching today?</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Submit a YouTube URL</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
