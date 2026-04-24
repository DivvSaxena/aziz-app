"use client";

import { useRouter } from "next/navigation";

export default function YayPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-8xl animate-bounce">🎉</div>
        <h1 className="text-6xl font-extrabold text-emerald-600">Yay!</h1>
        <p className="text-gray-500 text-xl">Your YouTube URL has been submitted!</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition text-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
