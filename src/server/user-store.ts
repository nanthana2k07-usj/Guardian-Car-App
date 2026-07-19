import connectDB from './db/mongodb';
import User, { IUser, VehicleInfo, EmergencyContactInfo } from './models/User';

export interface StoredUser {
  email: string;
  name: string;
  mobile: string;
  verified: boolean;
  vehicle?: VehicleInfo;
  emergencyContact?: EmergencyContactInfo;
  createdAt: string;
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getUser(email: string): Promise<StoredUser | undefined> {
  await connectDB();
  const user = await User.findOne({ email: normalizeEmail(email) });
  if (!user) return undefined;
  return {
    email: user.email,
    name: user.name,
    mobile: user.mobile,
    verified: user.verified,
    vehicle: user.vehicle,
    emergencyContact: user.emergencyContact,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function userExists(email: string): Promise<boolean> {
  await connectDB();
  const user = await User.findOne({ email: normalizeEmail(email) });
  return Boolean(user?.verified);
}

export async function emailTaken(email: string): Promise<boolean> {
  await connectDB();
  const user = await User.findOne({ email: normalizeEmail(email) });
  return Boolean(user);
}

export async function createPendingUser(data: { name: string; email: string; mobile: string }) {
  await connectDB();
  const key = normalizeEmail(data.email);
  
  const existing = await User.findOne({ email: key });
  if (existing?.verified) {
    throw new Error("An account with this email already exists. Please login instead.");
  }

  if (existing) {
    // Update existing unverified user
    existing.name = data.name.trim();
    existing.mobile = data.mobile.trim();
    existing.verified = false;
    await existing.save();
    return {
      email: existing.email,
      name: existing.name,
      mobile: existing.mobile,
      verified: existing.verified,
      vehicle: existing.vehicle,
      emergencyContact: existing.emergencyContact,
      createdAt: existing.createdAt.toISOString(),
    };
  }

  const user = await User.create({
    email: key,
    name: data.name.trim(),
    mobile: data.mobile.trim(),
    verified: false,
  });

  return {
    email: user.email,
    name: user.name,
    mobile: user.mobile,
    verified: user.verified,
    vehicle: user.vehicle,
    emergencyContact: user.emergencyContact,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function verifyUser(email: string): Promise<StoredUser | undefined> {
  await connectDB();
  const user = await User.findOne({ email: normalizeEmail(email) });
  if (!user) return undefined;
  
  user.verified = true;
  await user.save();
  
  return {
    email: user.email,
    name: user.name,
    mobile: user.mobile,
    verified: user.verified,
    vehicle: user.vehicle,
    emergencyContact: user.emergencyContact,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function updateUser(email: string, patch: Partial<Omit<StoredUser, "email" | "createdAt">>) {
  await connectDB();
  const key = normalizeEmail(email);
  const user = await User.findOne({ email: key });
  if (!user) return undefined;
  
  if (patch.name) user.name = patch.name;
  if (patch.mobile) user.mobile = patch.mobile;
  if (patch.verified !== undefined) user.verified = patch.verified;
  if (patch.vehicle) user.vehicle = patch.vehicle;
  if (patch.emergencyContact) user.emergencyContact = patch.emergencyContact;
  
  await user.save();
  
  return {
    email: user.email,
    name: user.name,
    mobile: user.mobile,
    verified: user.verified,
    vehicle: user.vehicle,
    emergencyContact: user.emergencyContact,
    createdAt: user.createdAt.toISOString(),
  };
}
