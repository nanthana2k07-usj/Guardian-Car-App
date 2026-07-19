import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  Power,
  Phone,
  MapPin,
  X,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { guardianStore, useGuardian } from "@/lib/guardian-store";

type Stage = "idle" | "verify" | "emergency" | "immobilizing" | "done";

export function MotionAlertFlow() {
  const state = useGuardian();
  const [stage, setStage] = useState<Stage>("idle");
  const [countdown, setCountdown] = useState(30);
  const prevMotion = useRef(false);

  // Open verification popup when motion becomes true
  useEffect(() => {
    if (state.motion && !prevMotion.current && stage === "idle") {
      setStage("verify");
    }
    prevMotion.current = state.motion;
  }, [state.motion, stage]);

  // Countdown during emergency
  useEffect(() => {
    if (stage !== "emergency") return;
    setCountdown(30);
    const t = setInterval(() => setCountdown((c) => (c <= 1 ? 0 : c - 1)), 1000);
    return () => clearInterval(t);
  }, [stage]);

  const authorize = () => {
    guardianStore.authorize();
    setStage("idle");
    toast.success("Authorized Access Verified", { icon: <CheckCircle2 className="h-4 w-4 text-success" /> });
  };

  const unauthorized = () => {
    guardianStore.markUnauthorized();
    setStage("emergency");
  };

  const immobilize = () => {
    setStage("immobilizing");
    setTimeout(() => {
      guardianStore.immobilize();
      setStage("done");
      toast.success("Vehicle Immobilized Successfully");
      setTimeout(() => setStage("idle"), 2200);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {/* Verification popup */}
      {stage === "verify" && (
        <motion.div
          key="verify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="glass glow w-full max-w-md rounded-3xl p-8 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="mx-auto mb-5 inline-flex rounded-2xl bg-warning/20 p-4"
            >
              <AlertTriangle className="h-9 w-9 text-warning" />
            </motion.div>
            <h2 className="font-display text-xl font-bold">Security Verification</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Motion has been detected near your vehicle. Is the person accessing your vehicle authorized?
            </p>
            <div className="mt-6 grid gap-3">
              <Button onClick={authorize} className="rounded-xl bg-success text-success-foreground hover:brightness-110">
                🟢 Yes, It's Me
              </Button>
              <Button onClick={unauthorized} className="rounded-xl bg-destructive text-destructive-foreground hover:brightness-110">
                🔴 No, Unauthorized Access
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Emergency full-screen */}
      {(stage === "emergency" || stage === "immobilizing" || stage === "done") && (
        <motion.div
          key="emergency"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            animate={{ backgroundColor: ["rgba(11,17,32,0.9)", "rgba(60,10,10,0.92)", "rgba(11,17,32,0.9)"] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-destructive bg-card/80 p-8 text-center"
            style={{ boxShadow: "0 0 60px -5px rgba(239,68,68,0.6)" }}
          >
            {stage === "done" ? (
              <div className="py-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <CheckCircle2 className="mx-auto h-20 w-20 text-success" />
                </motion.div>
                <h2 className="mt-4 font-display text-2xl font-bold">Vehicle Immobilized Successfully</h2>
                <p className="mt-2 text-sm text-muted-foreground">Engine disabled · relay = 1 · Execution time 1.2s</p>
              </div>
            ) : stage === "immobilizing" ? (
              <div className="py-8">
                <Loader2 className="mx-auto h-16 w-16 animate-spin text-destructive" />
                <h2 className="mt-4 font-display text-xl font-bold">Sending immobilize command…</h2>
                <p className="mt-1 text-sm text-muted-foreground">Writing relay = 1 to Firebase</p>
              </div>
            ) : (
              <>
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="mx-auto mb-4 inline-flex rounded-2xl bg-destructive/25 p-4"
                >
                  <ShieldAlert className="h-12 w-12 text-destructive" />
                </motion.div>
                <motion.h2
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.9 }}
                  className="font-display text-3xl font-extrabold text-destructive"
                >
                  🚨 VEHICLE THEFT ALERT
                </motion.h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Unauthorized access confirmed. Auto-escalating in{" "}
                  <span className="font-bold tabular-nums text-destructive">{countdown}s</span>
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button onClick={immobilize} className="rounded-xl bg-destructive text-destructive-foreground hover:brightness-110">
                    <Power className="h-4 w-4" /> Immobilize
                  </Button>
                  <Button onClick={() => toast("Police notified · 100")} variant="outline" className="rounded-xl border-destructive/50">
                    <Phone className="h-4 w-4" /> Contact Police
                  </Button>
                  <Button onClick={() => toast.success("Live location shared")} variant="outline" className="rounded-xl">
                    <MapPin className="h-4 w-4" /> Share Location
                  </Button>
                  <Button onClick={() => setStage("idle")} variant="ghost" className="rounded-xl">
                    <X className="h-4 w-4" /> Dismiss
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
