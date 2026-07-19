import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Car } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/vehicle")({
  component: VehicleRegistration,
});

function VehicleRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState('sedan');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const sessionEmail = localStorage.getItem('guardiancar_session');
    console.log('Session email from localStorage:', sessionEmail);
    
    if (!sessionEmail || !sessionEmail.includes('@')) {
      toast.error("Please login first to register your vehicle");
      navigate({ to: "/login" });
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const vehicle = {
      email: sessionEmail.trim(),
      vehicle: {
        ownerName: formData.get('owner') as string,
        number: formData.get('number') as string,
        brand: formData.get('brand') as string,
        model: formData.get('model') as string,
        type: vehicleType,
        color: formData.get('color') as string,
        deviceId: formData.get('device') as string,
      },
    };

    console.log('Sending vehicle data:', vehicle);

    try {
      const response = await fetch('/api/auth/profile/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle),
      });

      const text = await response.text();
      console.log('Vehicle API response:', text);
      
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
        throw new Error(result.message || 'Failed to register vehicle');
      }

      toast.success("Vehicle registered successfully");
      
      // Update local store with vehicle data
      const { userStore } = await import('@/lib/user-store');
      const currentUser = userStore.getCurrentUser();
      if (currentUser) {
        userStore.updateUser(currentUser.email, { vehicle: vehicle.vehicle });
      }
      
      navigate({ to: "/emergency-contact" });
    } catch (err) {
      console.error('Vehicle registration error:', err);
      toast.error(err instanceof Error ? err.message : "Failed to register vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Register your vehicle" subtitle="Link your GuardianCar IoT device">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Owner Name" id="owner" placeholder="John Carter" />
          <Field label="Vehicle Number" id="number" placeholder="MH12 AB 1234" />
          <Field label="Brand" id="brand" placeholder="Tesla" />
          <Field label="Model" id="model" placeholder="Model 3" />
          <div className="space-y-1.5">
            <Label>Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger className="rounded-xl bg-input/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="ev">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="Color" id="color" placeholder="Midnight Silver" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="device">ESP32 Device ID</Label>
          <div className="relative">
            <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="device" name="device" required placeholder="GC-ESP32-00A1" className="rounded-xl bg-input/40 pl-10" />
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register Vehicle"}
        </Button>
      </form>
    </AuthShell>
  );
}

function Field({ label, id, placeholder }: { label: string; id: string; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} required placeholder={placeholder} className="rounded-xl bg-input/40" />
    </div>
  );
}
