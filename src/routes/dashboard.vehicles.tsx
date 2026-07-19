import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ShieldCheck, Radar, AlertOctagon, Power, Car, Cpu, Palette, Gauge } from "lucide-react";
import { useGuardian } from "@/lib/guardian-store";

export const Route = createFileRoute("/dashboard/vehicles")({
  head: () => ({ meta: [{ title: "Vehicles — GuardianCar" }] }),
  component: Vehicles,
});

const statusStates = [
  { key: "safe", label: "Safe", icon: ShieldCheck, text: "text-success", ring: "ring-success", glow: "var(--color-success)" },
  { key: "motion", label: "Motion Detected", icon: Radar, text: "text-warning", ring: "ring-warning", glow: "var(--color-warning)" },
  { key: "unauthorized", label: "Unauthorized Access", icon: AlertOctagon, text: "text-destructive", ring: "ring-destructive", glow: "var(--color-destructive)" },
  { key: "immobilized", label: "Vehicle Immobilized", icon: Power, text: "text-destructive", ring: "ring-destructive", glow: "var(--color-destructive)" },
] as const;

function Vehicles() {
  const state = useGuardian();
  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">My Vehicles</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-primary p-4 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.6)]">
            <Car className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-bold">{state.vehicleName}</h2>
            <p className="text-sm text-muted-foreground">Tesla · Sedan · Midnight Silver</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Spec icon={Cpu} label="Device ID" value="GC-ESP32-00A1" />
          <Spec icon={Gauge} label="Vehicle No." value="MH12 AB 1234" />
          <Spec icon={Palette} label="Color" value="Silver" />
          <Spec icon={Car} label="Type" value="Sedan" />
        </div>
      </motion.div>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Vehicle Status States</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statusStates.map((s, i) => {
            const active = state.vehicleStatus === s.key;
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`glass rounded-2xl p-5 ${active ? `ring-2 ${s.ring}` : ""}`}
                style={active ? { boxShadow: `0 0 30px -8px ${s.glow}` } : undefined}
              >
                <s.icon className={`h-7 w-7 ${s.text}`} />
                <p className="mt-3 font-display font-semibold">{s.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{active ? "Current state" : "Standby"}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: typeof Car; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/40 p-3">
      <Icon className="h-4 w-4 text-accent" />
      <p className="mt-2 text-xs text-muted-foreground">{label}</p>
      <p className="truncate text-sm font-medium">{value}</p>
    </div>
  );
}
