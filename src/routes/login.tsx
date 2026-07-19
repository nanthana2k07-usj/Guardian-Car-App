import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { sendOtp } from "@/lib/otp-client";

export const Route = createFileRoute("/login")({
  component: Login,
});

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const emailError = emailTouched && email && !isValidEmail(email);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      setEmailTouched(true);
      return;
    }

    setLoading(true);
    try {
      const result = await sendOtp(email);
      toast.success(result.message);
      navigate({
        to: "/verify",
        search: {
          email,
          next: "/dashboard",
          purpose: "login",
          cooldown: String(result.resendAvailableInSeconds),
        } as never,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to your GuardianCar dashboard"
      footer={
        <>
          New to GuardianCar?{" "}
          <Link
            to="/signup"
            className="font-medium text-accent hover:underline"
          >
            Create Account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              className={`rounded-xl bg-input/40 pl-10 pr-10 transition-colors ${emailError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {emailTouched && email && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidEmail(email) ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </span>
            )}
          </div>
          {emailError && (
            <p className="text-xs text-red-500">
              Please enter a valid email address (e.g. you@example.com)
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPass ? "text" : "password"}
              required
              placeholder="••••••••"
              className="rounded-xl bg-input/40 pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPass ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <Checkbox id="remember" /> Remember me
          </label>
          <button
            type="button"
            onClick={() => toast("Password reset link sent")}
            className="text-accent hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Info banner */}
        <div className="rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-muted-foreground">
          🔐 After clicking Login, a{" "}
          <strong className="text-foreground">6-digit OTP</strong> will be sent
          to your email for secure verification.
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Login & Verify OTP"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
