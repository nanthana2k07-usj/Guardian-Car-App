import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/emergency-contact")({
  component: EmergencyContact,
});

function EmergencyContact() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const sessionEmail = localStorage.getItem('guardiancar_session');
    console.log('Session email from localStorage:', sessionEmail);
    
    if (!sessionEmail || !sessionEmail.includes('@')) {
      toast.error("Please login first to save emergency contact");
      navigate({ to: "/login" });
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const emergencyContact = {
      email: sessionEmail.trim(),
      emergencyContact: {
        name: formData.get('cname') as string,
        relationship: formData.get('rel') as string,
        phone: formData.get('phone') as string,
        altPhone: formData.get('alt') as string || undefined,
      },
    };

    console.log('Sending emergency contact data:', emergencyContact);

    try {
      const response = await fetch('/api/auth/profile/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emergencyContact),
      });

      const text = await response.text();
      console.log('Emergency contact API response:', text);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`);
      }

      if (!result.ok) {
        throw new Error(result.message || 'Failed to save emergency contact');
      }

      toast.success("Emergency contact saved");
      
      // Update local store with emergency contact data
      const { userStore } = await import('@/lib/user-store');
      const currentUser = userStore.getCurrentUser();
      if (currentUser) {
        userStore.updateUser(currentUser.email, { emergencyContact: emergencyContact.emergencyContact });
      }
      
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error('Emergency contact error:', err);
      toast.error(err instanceof Error ? err.message : "Failed to save emergency contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Emergency contact" subtitle="Who should we alert in an emergency?">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Contact Name" id="cname" placeholder="Sarah Carter" />
        <Field label="Relationship" id="rel" placeholder="Spouse" />
        <Field label="Phone Number" id="phone" placeholder="+91 98765 43210" type="tel" />
        <Field label="Alternate Phone Number" id="alt" placeholder="+91 91234 56780" type="tel" required={false} />
        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Contact & Finish"}
        </Button>
      </form>
    </AuthShell>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} placeholder={placeholder} className="rounded-xl bg-input/40" />
    </div>
  );
}
