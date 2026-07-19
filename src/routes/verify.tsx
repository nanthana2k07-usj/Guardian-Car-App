import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ApiError, sendOtp, verifyOtp } from "@/lib/otp-client";

export const Route = createFileRoute("/verify")({
  component: Verify,
});

function Verify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const { email, next, purpose, initialCooldown } = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        email: "",
        next: "/vehicle",
        purpose: "login" as const,
        initialCooldown: 0,
      };
    }
    const url = new URL(window.location.href);
    const flowPurpose =
      url.searchParams.get("purpose") === "signup" ? "signup" : "login";
    const cooldownValue = Number(url.searchParams.get("cooldown") ?? "0");

    return {
      email: url.searchParams.get("email") ?? "",
      next: url.searchParams.get("next") ?? "/vehicle",
      purpose: flowPurpose,
      initialCooldown: Number.isFinite(cooldownValue)
        ? Math.max(0, Math.floor(cooldownValue))
        : 0,
    };
  }, []);
  const [resendCountdown, setResendCountdown] = useState(initialCooldown);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  useEffect(() => {
    if (resendCountdown <= 0) return;

    const timer = window.setTimeout(() => {
      setResendCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [resendCountdown]);

  const resendOtp = async () => {
    if (!email) {
      toast.error("Missing email. Please sign up again.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email address. Please go back and try again.");
      return;
    }

    if (resendCountdown > 0) {
      toast.error(
        `Please wait ${resendCountdown} seconds before requesting another OTP.`,
      );
      return;
    }

    setLoading(true);
    try {
      const result = await sendOtp(email, purpose);
      setResendCountdown(result.resendAvailableInSeconds);
      toast.success(result.message);
    } catch (err) {
      if (err instanceof ApiError && err.retryAfterSeconds) {
        setResendCountdown(err.retryAfterSeconds);
      }
      toast.error(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (otp.length < 6) {
      toast.error("Enter the 6-digit code");
      return;
    }
    if (!email) {
      toast.error("Missing email. Please sign up again.");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp(email, otp);

      if (result.needsSignup) {
        toast.error("Please complete your signup first");
        navigate({ to: "/signup", search: { email } as never });
        return;
      }

      // Persist the verified user session before continuing to the next screen.
      const { userStore } = await import("@/lib/user-store");
      userStore.saveUser(result.user);

      setVerified(true);
      toast.success(result.message);
      setTimeout(() => navigate({ to: next as never }), 1400);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "OTP verification failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Verify your email"
      subtitle="We sent a 6-digit code to your inbox"
    >
      <AnimatePresence mode="wait">
        {verified ? (
          <motion.div
            key="ok"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="h-20 w-20 text-success" />
            </motion.div>
            <p className="mt-4 font-display text-lg font-semibold">Verified!</p>
            <p className="text-sm text-muted-foreground">Redirecting…</p>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="h-12 w-12 rounded-xl border-border text-lg"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={verify}
              disabled={loading}
              className="w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verify"
              )}
            </Button>

            <button
              onClick={resendOtp}
              disabled={loading || resendCountdown > 0}
              className="w-full text-center text-sm text-muted-foreground hover:text-accent disabled:opacity-60"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <RefreshCw className="h-4 w-4" />
                {resendCountdown > 0 ? (
                  <span className="font-medium text-accent">
                    Resend OTP in {resendCountdown}s
                  </span>
                ) : (
                  <>
                    Didn't receive a code?{" "}
                    <span className="font-medium text-accent">Resend OTP</span>
                  </>
                )}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
