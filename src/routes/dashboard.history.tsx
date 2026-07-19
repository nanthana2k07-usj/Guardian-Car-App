import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Radar, AlertOctagon, Power, ShieldCheck, PhoneCall, FileDown, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGuardian, type HistoryEvent } from "@/lib/guardian-store";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "Incident History — GuardianCar" }] }),
  component: HistoryPage,
});

const kindMeta: Record<HistoryEvent["kind"], { icon: typeof Radar; tone: string }> = {
  motion: { icon: Radar, tone: "text-warning" },
  unauthorized: { icon: AlertOctagon, tone: "text-destructive" },
  immobilize: { icon: Power, tone: "text-destructive" },
  authorized: { icon: ShieldCheck, tone: "text-success" },
  contact: { icon: PhoneCall, tone: "text-accent" },
};

function HistoryPage() {
  const { history } = useGuardian();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">Incident History</h1>
        <div className="flex shrink-0 gap-2">
          <Button onClick={() => toast.success("PDF exported")} variant="outline" size="sm" className="rounded-full">
            <FileDown className="h-4 w-4" /> PDF
          </Button>
          <Button onClick={() => toast.success("CSV exported")} variant="outline" size="sm" className="rounded-full">
            <FileSpreadsheet className="h-4 w-4" /> CSV
          </Button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6">
        <div className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
          {history.map((h, i) => {
            const m = kindMeta[h.kind];
            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="relative flex gap-4 pl-1"
              >
                <div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary ring-4 ring-background ${m.tone}`}>
                  <m.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 pb-1">
                  <p className="font-medium">{h.title}</p>
                  <p className="text-sm text-muted-foreground">{h.detail}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground/70">{h.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
