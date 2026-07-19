import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Mail, Phone, Car, PhoneCall, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { guardianStore, useGuardian } from "@/lib/guardian-store";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({ meta: [{ title: "Profile — GuardianCar" }] }),
  component: Profile,
});

function Profile() {
  const { vehicleName, profile } = useGuardian();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(profile);

  // Reload user data when component mounts to ensure latest data is displayed
  useEffect(() => {
    guardianStore.reloadFromSession();
  }, []);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const openEditor = () => {
    setForm(profile);
    setOpen(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    guardianStore.updateProfile(form);
    setOpen(false);
    toast.success("Profile updated");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Profile</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass glow rounded-3xl p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary text-3xl font-bold text-primary-foreground shadow-[0_12px_36px_-10px_rgba(59,130,246,0.7)]">
              {initials}
            </div>
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-card bg-success" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="font-display text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">GuardianCar Member since 2026</p>
            <Button onClick={openEditor} size="sm" className="mt-3 rounded-full bg-gradient-primary text-primary-foreground">
              <Pencil className="h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Info icon={Mail} label="Email" value={profile.email} />
          <Info icon={Phone} label="Mobile" value={profile.mobile} />
          <Info icon={Car} label="Registered Vehicle" value={vehicleName} />
          <Info icon={PhoneCall} label="Emergency Contact" value={profile.emergencyContact} />
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="sr-only">Edit profile</span>
        </DialogTrigger>
        <DialogContent className="glass rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <EditField label="Full Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
            <EditField label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
            <EditField label="Mobile" value={form.mobile} onChange={(v) => setForm((f) => ({ ...f, mobile: v }))} />
            <EditField
              label="Emergency Contact"
              value={form.emergencyContact}
              onChange={(v) => setForm((f) => ({ ...f, emergencyContact: v }))}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button onClick={save} className="rounded-xl bg-gradient-primary text-primary-foreground">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl bg-input/40" />
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4">
      <div className="rounded-xl bg-gradient-primary p-2.5">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
