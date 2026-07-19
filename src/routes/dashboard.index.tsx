import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  ShieldCheck,
  Radar,
  HeartPulse,
  Cpu,
  BatteryCharging,
  Wifi,
  Cloud,
  Clock,
  MapPin,
  Power,
  Activity,
  AlertOctagon,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { guardianStore, useGuardian, type VehicleStatus } from "@/lib/guardian-store";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — GuardianCar" }] }),
  component: Overview,
});

const statusMeta: Record<VehicleStatus, { label: string; color: string; icon: typeof ShieldCheck }> = {
  safe: { label: "Safe", color: "text-success", icon: ShieldCheck },
  authorized: { label: "Authorized", color: "text-success", icon: ShieldCheck },
  motion: { label: "Motion Detected", color: "text-warning", icon: Radar },
  unauthorized: { label: "Unauthorized Access", color: "text-destructive", icon: AlertOctagon },
  immobilized: { label: "Vehicle Immobilized", color: "text-destructive", icon: Power },
};

function Overview() {
  const state = useGuardian();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const sm = statusMeta[state.vehicleStatus];

  const cards = [
    { title: "Vehicle Status", value: sm.label, icon: sm.icon, tone: sm.color },
    { title: "Motion Detection", value: state.motion ? "Active" : "Clear", icon: Radar, tone: state.motion ? "text-warning" : "text-success" },
    { title: "Security Health", value: "98%", icon: HeartPulse, tone: "text-success" },
    { title: "Device Status", value: state.device === "online" ? "Online" : "Offline", icon: Cpu, tone: state.device === "online" ? "text-success" : "text-destructive" },
    { title: "Battery Status", value: `${state.battery}%`, icon: BatteryCharging, tone: "text-accent" },
    { title: "Internet Status", value: state.internet === "connected" ? "Connected" : "Offline", icon: Wifi, tone: "text-success" },
    { title: "Firebase Status", value: state.firebase === "synced" ? "Synced" : "Syncing", icon: Cloud, tone: "text-accent" },
    { title: "Last Updated", value: state.lastUpdated, icon: Clock, tone: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">Command Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">{state.vehicleName}</p>
        </div>
        <Button
          onClick={() => {
            if (!guardianStore.triggerMotion()) toast.error("Guardian Mode is off — activate it to run detection.");
          }}
          disabled={!state.guardianActive}
          className="shrink-0 rounded-full bg-gradient-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          <Zap className="h-4 w-4" /> Simulate Motion
        </Button>
      </div>

      {/* Guardian Mode master switch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass rounded-3xl p-6 ${state.guardianActive ? "ring-1 ring-success/40" : ""}`}
        style={state.guardianActive ? { boxShadow: "0 0 40px -14px var(--color-success)" } : undefined}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={state.guardianActive ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className={`rounded-2xl p-4 ${state.guardianActive ? "bg-success/20" : "bg-secondary/60"}`}
            >
              <ShieldCheck className={`h-8 w-8 ${state.guardianActive ? "text-success" : "text-muted-foreground"}`} />
            </motion.div>
            <div>
              <h2 className="font-display text-lg font-semibold">Guardian Mode</h2>
              <p className="text-sm text-muted-foreground">
                {state.guardianActive
                  ? "Armed — real-time theft detection is active."
                  : "Standby — the system is off. Detection will not run."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 text-xs font-medium ${state.guardianActive ? "text-success" : "text-muted-foreground"}`}>
              <span className={`h-2 w-2 rounded-full ${state.guardianActive ? "animate-pulse bg-success" : "bg-muted-foreground"}`} />
              {state.guardianActive ? "ONLINE" : "OFFLINE"}
            </span>
            <Button
              onClick={() => {
                if (state.guardianActive) {
                  guardianStore.stopGuardian();
                  toast("Guardian Mode stopped");
                } else {
                  guardianStore.startGuardian();
                  toast.success("Guardian Mode started — system is armed");
                }
              }}
              className={`rounded-full ${
                state.guardianActive
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-gradient-primary text-primary-foreground"
              } hover:brightness-110`}
            >
              {state.guardianActive ? (
                <>
                  <Power className="h-4 w-4" /> Stop System
                </>
              ) : (
                <>
                  <Power className="h-4 w-4" /> Start System
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>


      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)
          : cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-5 transition-shadow hover:shadow-[0_18px_44px_-20px_rgba(59,130,246,0.5)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{c.title}</span>
                  <c.icon className={`h-5 w-5 ${c.tone}`} />
                </div>
                <p className={`mt-3 font-display text-xl font-bold ${c.tone}`}>{c.value}</p>
              </motion.div>
            ))}
      </div>

      {/* Live monitoring */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            <h2 className="font-display text-lg font-semibold">Live Monitoring</h2>
            <span className="ml-auto flex items-center gap-1.5 text-xs text-success">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> Realtime
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MiniStat label="Vehicle" value={sm.label} tone={sm.color} />
            <MiniStat label="Motion" value={state.motion ? "Detected" : "Clear"} tone={state.motion ? "text-warning" : "text-success"} />
            <MiniStat label="Device" value={state.device} tone="text-success" />
            <MiniStat label="Firebase" value={state.firebase} tone="text-accent" />
            <MiniStat label="Relay" value={state.relay === 1 ? "ON (1)" : "OFF (0)"} tone={state.relay === 1 ? "text-destructive" : "text-muted-foreground"} />
            <MiniStat label="Connection" value={state.connection} tone="text-success" />
          </div>

          {/* Map placeholder */}
          <div className="mt-4 flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent),radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.12),transparent)]">
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-accent" />
              <p className="mt-2 text-sm font-medium">Last Known Location</p>
              <p className="text-xs text-muted-foreground">Google Maps · 19.0760° N, 72.8777° E</p>
            </div>
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6"
        >
          <h2 className="mb-4 font-display text-lg font-semibold">Recent Activity</h2>
          <div className="space-y-3">
            {state.history.slice(0, 5).map((h) => (
              <div key={h.id} className="flex gap-3 rounded-xl bg-secondary/40 p-3">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{h.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{h.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Security stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Threats Blocked", value: 142, suffix: "" },
          { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
          { label: "Response Time", value: 1.2, suffix: "s", decimals: 1 },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <p className="font-display text-3xl font-extrabold text-gradient">
              <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl bg-secondary/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-semibold capitalize ${tone}`}>{value}</p>
    </div>
  );
}
