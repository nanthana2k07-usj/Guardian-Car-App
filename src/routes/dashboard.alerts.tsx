import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGuardian, type AlertRow } from "@/lib/guardian-store";

export const Route = createFileRoute("/dashboard/alerts")({
  head: () => ({ meta: [{ title: "Alerts — GuardianCar" }] }),
  component: Alerts,
});

const sevTone: Record<AlertRow["severity"], string> = {
  low: "bg-accent/20 text-accent",
  medium: "bg-warning/20 text-warning",
  high: "bg-warning/25 text-warning",
  critical: "bg-destructive/20 text-destructive",
};

const PER_PAGE = 5;

function Alerts() {
  const { alerts } = useGuardian();
  const [query, setQuery] = useState("");
  const [sev, setSev] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      alerts.filter(
        (a) =>
          (sev === "all" || a.severity === sev) &&
          (a.type.toLowerCase().includes(query.toLowerCase()) ||
            a.vehicle.toLowerCase().includes(query.toLowerCase())),
      ),
    [alerts, query, sev],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Recent Alerts</h1>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search alerts…"
            className="rounded-xl bg-input/40 pl-10"
          />
        </div>
        <Select value={sev} onValueChange={(v) => { setSev(v); setPage(1); }}>
          <SelectTrigger className="w-40 rounded-xl bg-input/40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Alert Type</th>
                <th className="px-5 py-3 font-medium">Severity</th>
                <th className="px-5 py-3 font-medium">Vehicle</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b border-border/40 transition-colors hover:bg-secondary/30">
                  <td className="px-5 py-3.5 text-muted-foreground">{a.time}</td>
                  <td className="px-5 py-3.5 font-medium">{a.type}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${sevTone[a.severity]}`}>
                      {a.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.vehicle}</td>
                  <td className="px-5 py-3.5">{a.status}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    No alerts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Page {page} of {pages}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-border p-2 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="rounded-lg border border-border p-2 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
