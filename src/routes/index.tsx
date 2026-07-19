import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate({ to: "/welcome" }), 400);
          return 100;
        }
        return Math.min(100, p + Math.random() * 12 + 4);
      });
    }, 160);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <AnimatedBackground particleCount={34} />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <Logo size={132} showText={false} animated className="relative" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
      >
        Guardian<span className="text-gradient">Car</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 text-sm font-medium tracking-wide text-muted-foreground sm:text-base"
      >
        Smart Protection. Instant Response.
      </motion.p>

      <div className="mt-12 w-full max-w-xs">
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-gradient-primary"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Initializing secure link…</span>
          <span className="tabular-nums text-accent">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
