"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function playCelebrationSound() {
  const ctx = new AudioContext();

  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
    gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
    osc.start(ctx.currentTime + i * 0.12);
    osc.stop(ctx.currentTime + i * 0.12 + 0.3);
  });
}

export default function YayPage() {
  const router = useRouter();

  useEffect(() => {
    playCelebrationSound();
  }, []);

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
