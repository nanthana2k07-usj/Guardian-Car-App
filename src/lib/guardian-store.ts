import { useSyncExternalStore } from "react";
import {
  emergencyDisplay,
  userStore,
  vehicleDisplayName,
  type UserAccount,
} from "@/lib/user-store";

export type VehicleStatus =
  "safe" | "motion" | "unauthorized" | "immobilized" | "authorized";

export interface AlertRow {
  id: string;
  time: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  vehicle: string;
  status: string;
}

export interface HistoryEvent {
  id: string;
  time: string;
  kind: "motion" | "unauthorized" | "immobilize" | "authorized" | "contact";
  title: string;
  detail: string;
}

export interface OwnerProfile {
  name: string;
  email: string;
  mobile: string;
  emergencyContact: string;
}

export interface GuardianState {
  guardianActive: boolean;
  vehicleStatus: VehicleStatus;
  motion: boolean;
  relay: 0 | 1;
  device: "online" | "offline";
  battery: number;
  internet: "connected" | "disconnected";
  firebase: "synced" | "syncing";
  connection: "stable" | "weak";
  lastUpdated: string;
  vehicleName: string;
  profile: OwnerProfile;
  vehicle?: UserAccount["vehicle"];
  emergencyContact?: UserAccount["emergencyContact"];
  alerts: AlertRow[];
  history: HistoryEvent[];
}

const now = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

function profileFromUser(user?: UserAccount): OwnerProfile {
  if (!user) {
    return { name: "", email: "", mobile: "", emergencyContact: "Not set" };
  }
  return {
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    emergencyContact: emergencyDisplay(user.emergencyContact),
  };
}

function buildInitialState(): GuardianState {
  const user = userStore.getCurrentUser();
  return {
    guardianActive: false,
    vehicleStatus: "safe",
    motion: false,
    relay: 0,
    device: "online",
    battery: 87,
    internet: "connected",
    firebase: "synced",
    connection: "stable",
    lastUpdated: now(),
    vehicleName: vehicleDisplayName(user?.vehicle),
    profile: profileFromUser(user),
    vehicle: user?.vehicle,
    emergencyContact: user?.emergencyContact,
    alerts: [
      {
        id: "a1",
        time: "09:42",
        type: "Motion Detected",
        severity: "medium",
        vehicle: "Model 3",
        status: "Resolved",
      },
      {
        id: "a2",
        time: "08:15",
        type: "Unauthorized Access",
        severity: "critical",
        vehicle: "Model 3",
        status: "Immobilized",
      },
      {
        id: "a3",
        time: "Yesterday",
        type: "Device Reconnected",
        severity: "low",
        vehicle: "Model 3",
        status: "Info",
      },
      {
        id: "a4",
        time: "Yesterday",
        type: "Motion Detected",
        severity: "medium",
        vehicle: "Model 3",
        status: "Authorized",
      },
    ],
    history: [
      {
        id: "h1",
        time: "Today 09:42",
        kind: "motion",
        title: "Motion Detected",
        detail: "Sensor triggered near driver door.",
      },
      {
        id: "h2",
        time: "Yesterday 22:10",
        kind: "immobilize",
        title: "Vehicle Immobilized",
        detail: "Remote relay command executed in 1.2s.",
      },
      {
        id: "h3",
        time: "Yesterday 22:08",
        kind: "unauthorized",
        title: "Unauthorized Access",
        detail: "Owner flagged access as unauthorized.",
      },
    ],
  };
}

let state: GuardianState = buildInitialState();

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function set(patch: Partial<GuardianState>) {
  state = { ...state, ...patch, lastUpdated: now() };
  emit();
}

function persistProfile() {
  const email = userStore.getSession();
  if (!email) return;
  userStore.updateUser(email, {
    name: state.profile.name,
    mobile: state.profile.mobile,
    vehicle: state.vehicle,
    emergencyContact: state.emergencyContact,
  });
}

export const guardianStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  get: () => state,
  loadUser(user: UserAccount) {
    userStore.syncFromServer(user);
    set({
      profile: profileFromUser(user),
      vehicleName: vehicleDisplayName(user.vehicle),
      vehicle: user.vehicle,
      emergencyContact: user.emergencyContact,
    });
  },
  reloadFromSession() {
    const user = userStore.getCurrentUser();
    if (user) {
      set({
        profile: profileFromUser(user),
        vehicleName: vehicleDisplayName(user.vehicle),
        vehicle: user.vehicle,
        emergencyContact: user.emergencyContact,
      });
    }
  },
  startGuardian() {
    set({ guardianActive: true, vehicleStatus: "safe", motion: false });
    state.history = [
      {
        id: crypto.randomUUID(),
        time: "Now",
        kind: "authorized",
        title: "Guardian Mode Activated",
        detail: "Real-time theft detection is now armed and monitoring.",
      },
      ...state.history,
    ];
  },
  stopGuardian() {
    set({ guardianActive: false, motion: false, vehicleStatus: "safe" });
    state.history = [
      {
        id: crypto.randomUUID(),
        time: "Now",
        kind: "contact",
        title: "Guardian Mode Deactivated",
        detail: "Monitoring paused. The system is now standing by.",
      },
      ...state.history,
    ];
  },
  updateProfile(patch: Partial<OwnerProfile>) {
    const profile = { ...state.profile, ...patch };
    set({ profile });
    persistProfile();
  },
  updateVehicle(vehicle: NonNullable<UserAccount["vehicle"]>) {
    set({ vehicle, vehicleName: vehicleDisplayName(vehicle) });
    persistProfile();
  },
  updateEmergencyContact(
    contact: NonNullable<UserAccount["emergencyContact"]>,
  ) {
    set({
      emergencyContact: contact,
      profile: {
        ...state.profile,
        emergencyContact: emergencyDisplay(contact),
      },
    });
    persistProfile();
  },
  triggerMotion() {
    if (!state.guardianActive) return false;
    set({ motion: true, vehicleStatus: "motion" });
    state.history = [
      {
        id: crypto.randomUUID(),
        time: "Now",
        kind: "motion",
        title: "Motion Detected",
        detail: "IoT sensor detected movement near the vehicle.",
      },
      ...state.history,
    ];
    return true;
  },
  authorize() {
    set({ motion: false, vehicleStatus: "authorized" });
    state.history = [
      {
        id: crypto.randomUUID(),
        time: "Now",
        kind: "authorized",
        title: "Authorized Access Verified",
        detail: "Owner confirmed access as authorized.",
      },
      ...state.history,
    ];
    state.alerts = [
      {
        id: crypto.randomUUID(),
        time: now().slice(0, 5),
        type: "Motion Detected",
        severity: "medium",
        vehicle: "Model 3",
        status: "Authorized",
      },
      ...state.alerts,
    ];
  },
  markUnauthorized() {
    set({ vehicleStatus: "unauthorized" });
  },
  immobilize() {
    set({ relay: 1, vehicleStatus: "immobilized", motion: false });
    state.history = [
      {
        id: crypto.randomUUID(),
        time: "Now",
        kind: "immobilize",
        title: "Vehicle Immobilized",
        detail: "relay = 1 written to Firebase. Engine disabled.",
      },
      ...state.history,
    ];
    state.alerts = [
      {
        id: crypto.randomUUID(),
        time: now().slice(0, 5),
        type: "Unauthorized Access",
        severity: "critical",
        vehicle: "Model 3",
        status: "Immobilized",
      },
      ...state.alerts,
    ];
  },
  reset() {
    set({ relay: 0, vehicleStatus: "safe", motion: false });
  },
};

export function useGuardian(): GuardianState {
  return useSyncExternalStore(
    guardianStore.subscribe,
    guardianStore.get,
    guardianStore.get,
  );
}
