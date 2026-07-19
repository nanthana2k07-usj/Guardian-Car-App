import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — GuardianCar" }] }),
  component: Analytics,
});

const motionData = [
  { day: "Mon", events: 4 },
  { day: "Tue", events: 7 },
  { day: "Wed", events: 3 },
  { day: "Thu", events: 9 },
  { day: "Fri", events: 6 },
  { day: "Sat", events: 12 },
  { day: "Sun", events: 5 },
];

const alertStats = [
  { month: "Jan", alerts: 12 },
  { month: "Feb", alerts: 19 },
  { month: "Mar", alerts: 8 },
  { month: "Apr", alerts: 15 },
  { month: "May", alerts: 22 },
  { month: "Jun", alerts: 11 },
];

const statusSummary = [
  { name: "Safe", value: 68, color: "#22c55e" },
  { name: "Motion", value: 18, color: "#eab308" },
  { name: "Unauthorized", value: 9, color: "#ef4444" },
  { name: "Immobilized", value: 5, color: "#3b82f6" },
];

function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Analytics</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Motion Detection Frequency" subtitle="This week">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={motionData}>
              <defs>
                <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3b82f6" stopOpacity={0.7} />
                  <stop offset="1" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={2.5} fill="url(#areaG)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Alert Statistics" subtitle="Monthly reports">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={alertStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(59,130,246,0.08)" }} />
              <Bar dataKey="alerts" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Vehicle Status Summary" subtitle="Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusSummary} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                {statusSummary.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            {statusSummary.map((s) => (
              <span key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} /> {s.name}
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Weekly Reports" subtitle="Events trend">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={motionData}>
              <defs>
                <linearGradient id="areaG2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#22d3ee" stopOpacity={0.7} />
                  <stop offset="1" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="events" stroke="#22d3ee" strokeWidth={2.5} fill="url(#areaG2)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: "oklch(0.21 0.035 262)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
};

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-6">
      <div className="mb-4">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}
