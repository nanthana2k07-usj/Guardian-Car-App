import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Activity,
  BellRing,
  Power,
  Cloud,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "GuardianCar — Protect Your Vehicle Anytime, Anywhere" },
      {
        name: "description",
        content:
          "AI-powered vehicle theft detection with instant alerts and remote immobilization. Real-time monitoring, cloud connectivity, and emergency response.",
      },
    ],
  }),
  component: Welcome,
});

const features = [
  { icon: Activity, title: "Real-Time Monitoring", desc: "24/7 live sensor tracking of your vehicle's security state." },
  { icon: BellRing, title: "Instant Alerts", desc: "Get notified the moment motion or intrusion is detected." },
  { icon: Power, title: "Remote Immobilization", desc: "Disable the engine remotely with a single secure command." },
  { icon: Cloud, title: "Cloud Connectivity", desc: "Firebase-backed realtime sync across all your devices." },
  { icon: ShieldCheck, title: "Secure Authentication", desc: "Multi-step verification keeps your account locked down." },
  { icon: PhoneCall, title: "Emergency Support", desc: "One tap to alert contacts and share live location." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

function Welcome() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground particleCount={30} />

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild className="rounded-full bg-gradient-primary text-primary-foreground hover:scale-105 transition-transform">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-2 lg:pt-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium text-accent"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            AI & IoT Security · Live
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Protect Your Vehicle <span className="text-gradient">Anytime, Anywhere</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-lg text-lg text-muted-foreground"
          >
            AI-powered vehicle theft detection with instant alerts and remote immobilization.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="rounded-full bg-gradient-primary text-primary-foreground shadow-[0_10px_40px_-10px_rgba(59,130,246,0.7)] hover:scale-105 transition-transform">
              <Link to="/signup">
                Create Account <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-border bg-card/40">
              <Link to="/login">Login</Link>
            </Button>
          </motion.div>
        </div>

        {/* Shield illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto flex items-center justify-center"
        >
          <motion.div
            className="absolute h-72 w-72 rounded-full bg-primary/25 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative glass glow rounded-[2.5rem] p-12"
          >
            <Logo size={200} showText={false} animated />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-center font-display text-3xl font-bold"
        >
          Everything you need to stay <span className="text-gradient">protected</span>
        </motion.h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Enterprise-grade security features powered by AI and connected IoT hardware.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="glass group rounded-2xl p-6 transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.5)]"
            >
              <div className="mb-4 inline-flex rounded-xl bg-gradient-primary p-3 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.6)]">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-1.5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-10 text-center">
        <Logo className="justify-center" />
        <p className="mt-3 text-sm text-muted-foreground">Smart Protection. Instant Response.</p>
        <p className="mt-1 text-xs text-muted-foreground/70">© 2026 GuardianCar Technologies</p>
      </footer>
    </div>
  );
}
