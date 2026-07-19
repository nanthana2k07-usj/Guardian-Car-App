import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Car,
  BellRing,
  History,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { MotionAlertFlow } from "@/components/MotionAlertFlow";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/vehicles", label: "Vehicles", icon: Car },
  { to: "/dashboard/alerts", label: "Alerts", icon: BellRing },
  { to: "/dashboard/history", label: "History", icon: History },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
  { to: "/dashboard/profile", label: "Profile", icon: User },
] as const;

function DashboardLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const logout = () => {
    toast.success("Logged out");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen">
      {/* Top navbar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/dashboard">
            <Logo size={34} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => {
              const active = "exact" in n ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gradient-primary text-primary-foreground shadow-[0_6px_20px_-8px_rgba(59,130,246,0.7)]"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={logout} variant="ghost" size="sm" className="hidden rounded-full text-muted-foreground lg:flex">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
            <button className="rounded-lg p-2 text-foreground lg:hidden" onClick={() => setOpen((o) => !o)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border/60 lg:hidden"
            >
              <div className="grid gap-1 px-4 py-3">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <n.icon className="h-4 w-4" /> {n.label}
                  </Link>
                ))}
                <button onClick={logout} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-8 border-t border-border/60 py-8 text-center">
        <Logo className="justify-center" size={30} />
        <p className="mt-2 text-sm text-muted-foreground">Smart Protection. Instant Response.</p>
        <p className="mt-1 text-xs text-muted-foreground/70">© 2026 GuardianCar Technologies</p>
      </footer>

      {/* Global motion-detection + emergency flow */}
      <MotionAlertFlow />
    </div>
  );
}
