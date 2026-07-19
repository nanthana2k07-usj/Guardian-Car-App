import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Props {
  particleCount?: number;
  className?: string;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export function AnimatedBackground({ particleCount = 26, className = "" }: Props) {
  // Generate particles only on the client to avoid SSR hydration mismatch.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
      })),
    );
  }, [particleCount]);

  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* gradient orbs */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      {/* circuit lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.15]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuitG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {[15, 35, 55, 75, 90].map((y, i) => (
          <path
            key={i}
            d={`M-50 ${y * 8} H ${200 + i * 60} l 40 40 H 2000`}
            stroke="url(#circuitG)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 14"
            style={{ animation: `dash-flow ${18 + i * 4}s linear infinite` }}
          />
        ))}
      </svg>

      {/* particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent/70"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
