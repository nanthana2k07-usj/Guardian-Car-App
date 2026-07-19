import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  User,
  Car,
  PhoneCall,
  Bell,
  Cloud,
  Palette,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { guardianStore, useGuardian } from "@/lib/guardian-store";
import { userStore } from "@/lib/user-store";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — GuardianCar" }] }),
  component: SettingsPage,
});

const toggleConfigs = [
  {
    icon: Bell,
    label: "Notification Preferences",
    desc: "Push, email & SMS alerts",
    key: "notifications",
  },
  {
    icon: Cloud,
    label: "Firebase Realtime Sync",
    desc: "Continuous device sync",
    key: "firebaseSync",
  },
  {
    icon: Palette,
    label: "Dark Cyber Theme",
    desc: "Futuristic dark interface",
    key: "darkTheme",
  },
  {
    icon: ShieldCheck,
    label: "Two-Factor Security",
    desc: "Extra login protection",
    key: "twoFactor",
  },
] as const;

type PreferencesState = {
  notifications: boolean;
  firebaseSync: boolean;
  darkTheme: boolean;
  twoFactor: boolean;
};

const defaultPreferences: PreferencesState = {
  notifications: true,
  firebaseSync: true,
  darkTheme: true,
  twoFactor: false,
};

function SettingsPage() {
  const { profile, vehicle, emergencyContact } = useGuardian();
  const currentUser = userStore.getCurrentUser();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferences, setPreferences] = useState<PreferencesState>(() => {
    if (typeof window === "undefined") return defaultPreferences;
    try {
      const saved = localStorage.getItem("guardiancar_preferences");
      return saved
        ? ({ ...defaultPreferences, ...JSON.parse(saved) } as PreferencesState)
        : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  useEffect(() => {
    // Pull the latest signed-in user from local storage into the dashboard store
    // so the settings page always reflects registration details after login.
    guardianStore.reloadFromSession();
  }, []);

  const handlePasswordChange = () => {
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password updated successfully");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggleChange = (
    key: keyof PreferencesState,
    checked: boolean,
  ) => {
    const updated = { ...preferences, [key]: checked };
    setPreferences(updated);
    localStorage.setItem("guardiancar_preferences", JSON.stringify(updated));
    toast.success(
      `${toggleConfigs.find((item) => item.key === key)?.label ?? key} updated`,
    );
  };

  const vehicleDisplay = vehicle
    ? `${vehicle.brand} ${vehicle.model} — ${vehicle.number}`
    : "No vehicle registered";
  const emergencyDisplay = emergencyContact
    ? `${emergencyContact.name} · ${emergencyContact.relationship}`
    : "Not set";
  const registeredOn = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleString()
    : "Not available";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Settings</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section icon={User} title="User Profile">
          <Field label="Full Name" value={profile.name || "Not set"} />
          <Field label="Email" value={profile.email || "Not set"} />
          <Field label="Mobile" value={profile.mobile || "Not set"} />
          <Field label="Registered On" value={registeredOn} />
        </Section>

        <Section icon={Car} title="Vehicle Management">
          <Field label="Vehicle" value={vehicleDisplay} />
          <Field
            label="ESP32 Device ID"
            value={vehicle?.deviceId || "Not set"}
          />
          <Field
            label="Model"
            value={vehicle ? `${vehicle.brand} ${vehicle.model}` : "Not set"}
          />
        </Section>

        <Section icon={PhoneCall} title="Emergency Contacts">
          <Field
            label="Contact Name"
            value={emergencyContact?.name || "Not set"}
          />
          <Field
            label="Phone Number"
            value={emergencyContact?.phone || "Not set"}
          />
          <Field label="Relationship" value={emergencyDisplay} />
        </Section>

        <Section icon={KeyRound} title="Security & Password">
          <div className="space-y-1.5">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-xl bg-input/40"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-xl bg-input/40"
            />
          </div>
          <Button
            onClick={handlePasswordChange}
            className="mt-2 rounded-xl bg-gradient-primary text-primary-foreground"
          >
            Change Password
          </Button>
        </Section>
      </div>

      <div className="glass rounded-3xl p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Preferences</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {toggleConfigs.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4"
            >
              <div className="rounded-xl bg-gradient-primary p-2.5">
                <t.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <Switch
                checked={preferences[t.key]}
                onCheckedChange={(checked) =>
                  handleToggleChange(t.key, checked)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof User;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-3xl p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent" />
        <h2 className="font-display text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        value={value}
        readOnly
        type={type}
        placeholder={placeholder}
        className="rounded-xl bg-input/40"
      />
    </div>
  );
}
