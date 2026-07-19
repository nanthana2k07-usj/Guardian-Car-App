import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
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
import { registerAccount } from "@/lib/otp-client";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

function getPasswordStrength(password: string): StrengthLevel {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
  return Math.min(4, score) as StrengthLevel;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];

// ─── Component ────────────────────────────────────────────────────────────────

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const emailError = emailTouched && email && !isValidEmail(email);
  const strength = getPasswordStrength(password);
  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordsMismatch = confirm.length > 0 && password !== confirm;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const mobile = formData.get("mobile") as string;

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      setEmailTouched(true);
      return;
    }

    if (!name || name.trim().length < 2) {
      toast.error("Please enter your full name");
      return;
    }

    if (!mobile || mobile.trim().length < 6) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    if (strength < 2) {
      toast.error("Please choose a stronger password");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await registerAccount({ name, email, mobile });

      toast.success(result.message);
      navigate({
        to: "/verify",
        search: {
          email,
          purpose: "signup",
          cooldown: String(result.otp.resendAvailableInSeconds),
        } as never,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start protecting your vehicle in minutes"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Carter"
              className="rounded-xl bg-input/40 pl-10"
            />
          </div>
        </div>

        {/* Email with live validation */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
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

        {/* Mobile */}
        <div className="space-y-1.5">
          <Label htmlFor="mobile">Mobile Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              required
              placeholder="+91 98765 43210"
              className="rounded-xl bg-input/40 pl-10"
            />
          </div>
        </div>

        {/* Password with strength meter */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              required
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {/* Strength bar */}
          {password.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 flex-1 rounded-full transition-all duration-300"
                    style={{
                      background:
                        i <= strength
                          ? STRENGTH_COLORS[strength]
                          : "hsl(var(--border))",
                    }}
                  />
                ))}
              </div>
              <p
                className="text-xs font-medium"
                style={{ color: STRENGTH_COLORS[strength] }}
              >
                {STRENGTH_LABELS[strength]} password
                {strength < 3 && " — add uppercase, numbers & symbols"}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password with match indicator */}
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="confirm"
              name="confirm"
              type={showConfirm ? "text" : "password"}
              required
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`rounded-xl bg-input/40 pl-10 pr-10 transition-colors ${passwordsMismatch ? "border-red-500" : passwordsMatch ? "border-green-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {passwordsMatch && (
            <p className="text-xs text-green-500 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Passwords match
            </p>
          )}
          {passwordsMismatch && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <XCircle className="h-3 w-3" /> Passwords do not match
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create Account & Send OTP"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
