import type { EmergencyContactInfo, VehicleInfo } from "@/server/user-store";

export interface UserAccount {
  email: string;
  name: string;
  mobile: string;
  vehicle?: VehicleInfo;
  emergencyContact?: EmergencyContactInfo;
  createdAt: string;
}

const USERS_KEY = "guardiancar_users";
const SESSION_KEY = "guardiancar_session";

function readUsers(): Record<string, UserAccount> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, UserAccount>) : {};
  } catch {
    return {};
  }
}

function writeUsers(users: Record<string, UserAccount>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const userStore = {
  getSession(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(SESSION_KEY);
  },

  setSession(email: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(SESSION_KEY, normalizeEmail(email));
  },

  clearSession() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(SESSION_KEY);
  },

  userExists(email: string): boolean {
    const users = readUsers();
    return Boolean(users[normalizeEmail(email)]);
  },

  getUser(email: string): UserAccount | undefined {
    return readUsers()[normalizeEmail(email)];
  },

  getCurrentUser(): UserAccount | undefined {
    const email = this.getSession();
    return email ? this.getUser(email) : undefined;
  },

  saveUser(user: UserAccount) {
    const users = readUsers();
    users[normalizeEmail(user.email)] = {
      ...user,
      email: normalizeEmail(user.email),
    };
    writeUsers(users);
    this.setSession(user.email);
  },

  updateUser(email: string, patch: Partial<UserAccount>) {
    const key = normalizeEmail(email);
    const users = readUsers();
    const existing = users[key];
    if (!existing) return undefined;
    const updated = { ...existing, ...patch, email: key };
    users[key] = updated;
    writeUsers(users);
    return updated;
  },

  syncFromServer(user: UserAccount) {
    this.saveUser(user);
    return user;
  },
};

export function vehicleDisplayName(vehicle?: VehicleInfo) {
  if (!vehicle) return "No vehicle registered";
  return `${vehicle.brand} ${vehicle.model} — ${vehicle.number}`;
}

export function emergencyDisplay(contact?: EmergencyContactInfo) {
  if (!contact) return "Not set";
  return `${contact.name} · ${contact.relationship}`;
}
