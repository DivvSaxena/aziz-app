"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function playExcitingSound() {
  const ctx = new AudioContext();

  // Rising whoosh sweep
  const sweep = ctx.createOscillator();
  const sweepGain = ctx.createGain();
  sweep.connect(sweepGain);
  sweepGain.connect(ctx.destination);
  sweep.type = "sawtooth";
  sweep.frequency.setValueAtTime(150, ctx.currentTime);
  sweep.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.4);
  sweepGain.gain.setValueAtTime(0.15, ctx.currentTime);
  sweepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  sweep.start(ctx.currentTime);
  sweep.stop(ctx.currentTime + 0.4);

  // Triumphant fanfare: C E G C E (ascending major arpeggio with harmonics)
  const fanfare = [
    { freq: 523, t: 0.35 },
    { freq: 659, t: 0.5 },
    { freq: 784, t: 0.65 },
    { freq: 1047, t: 0.8 },
    { freq: 1319, t: 0.95 },
  ];
  fanfare.forEach(({ freq, t }) => {
    [1, 2, 3].forEach((harmonic) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = harmonic === 1 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq * harmonic, ctx.currentTime + t);
      gain.gain.setValueAtTime(0.25 / harmonic, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.45);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.45);
    });
  });

  // Balloon pop sounds — short noise bursts
  [0.4, 0.7, 1.0, 1.3, 1.6].forEach((t) => {
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800 + Math.random() * 600;
    filter.Q.value = 0.5;
    const popGain = ctx.createGain();
    popGain.gain.setValueAtTime(0.6, ctx.currentTime + t);
    popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.06);

    noise.connect(filter);
    filter.connect(popGain);
    popGain.connect(ctx.destination);
    noise.start(ctx.currentTime + t);
    noise.stop(ctx.currentTime + t + 0.06);
  });

  // Sparkle high pings
  [0.5, 0.75, 1.0, 1.25, 1.5, 1.75].forEach((t, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(2000 + i * 300, ctx.currentTime + t);
    gain.gain.setValueAtTime(0.12, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.15);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.15);
  });
}

const BALLOON_EMOJIS = ["🎈", "🎈", "🎈", "🎉", "🎊", "🎈", "🎈"];
const COLORS = ["red", "blue", "yellow", "pink", "purple", "orange", "green"];

function generateBalloons(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: BALLOON_EMOJIS[i % BALLOON_EMOJIS.length],
    left: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 1.2}s`,
    duration: `${3.5 + Math.random() * 2}s`,
    sway: `${(Math.random() - 0.5) * 80}px`,
    color: COLORS[i % COLORS.length],
  }));
}

export default function YayPage() {
  const router = useRouter();
  const [balloons] = useState(() => generateBalloons(18));

  useEffect(() => {
    playExcitingSound();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center overflow-hidden relative">
      {/* Balloons */}
      {balloons.map((b) => (
        <span
          key={b.id}
          className="balloon"
          style={{
            left: b.left,
            "--delay": b.delay,
            "--duration": b.duration,
            "--sway": b.sway,
          } as React.CSSProperties}
        >
          {b.emoji}
        </span>
      ))}

      {/* Content */}
      <div className="text-center space-y-6 relative z-10">
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
