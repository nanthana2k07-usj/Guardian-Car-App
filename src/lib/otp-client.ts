import { z } from "zod";

const userSchema = z.object({
  email: z.string(),
  name: z.string(),
  mobile: z.string(),
  vehicle: z
    .object({
      ownerName: z.string(),
      number: z.string(),
      brand: z.string(),
      model: z.string(),
      type: z.string(),
      color: z.string(),
      deviceId: z.string(),
    })
    .optional(),
  emergencyContact: z
    .object({
      name: z.string(),
      relationship: z.string(),
      phone: z.string(),
      altPhone: z.string().optional(),
    })
    .optional(),
  createdAt: z.string(),
});

const sendOtpResponseSchema = z.object({
  ok: z.literal(true),
  email: z.string().email(),
  message: z.string(),
  expiresInSeconds: z.number().int().positive(),
  resendAvailableInSeconds: z.number().int().nonnegative(),
});

const signupResponseSchema = z.object({
  ok: z.literal(true),
  message: z.string(),
  otp: sendOtpResponseSchema,
});

const verifyRespSchema = z.union([
  z.object({
    ok: z.literal(true),
    message: z.string(),
    user: userSchema,
    needsSignup: z.literal(false).optional(),
  }),
  z.object({
    ok: z.literal(true),
    message: z.string(),
    email: z.string().email(),
    user: z.null(),
    needsSignup: z.literal(true),
  }),
]);

type ApiErrorPayload = {
  message?: string;
  code?: string;
  retryAfterSeconds?: number;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  retryAfterSeconds?: number;

  constructor(
    message: string,
    status: number,
    code?: string,
    retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

async function parsePayload<T>(
  res: Response,
  schema: z.ZodSchema<T>,
  fallbackMessage: string,
) {
  const payload = (await res.json().catch(() => ({}))) as ApiErrorPayload;
  if (!res.ok) {
    throw new ApiError(
      payload?.message ?? fallbackMessage,
      res.status,
      payload?.code,
      payload?.retryAfterSeconds,
    );
  }

  return schema.parse(payload);
}

export async function registerAccount(data: {
  name: string;
  email: string;
  mobile: string;
}) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  return parsePayload(res, signupResponseSchema, "Failed to create account");
}

export async function sendOtp(
  email: string,
  purpose: "login" | "signup" = "login",
) {
  const res = await fetch("/api/auth/otp/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, purpose }),
  });
  return parsePayload(res, sendOtpResponseSchema, "Failed to send OTP");
}

export async function verifyOtp(email: string, code: string) {
  const res = await fetch("/api/auth/otp/verify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  return parsePayload(res, verifyRespSchema, "OTP verification failed");
}

export async function saveVehicle(
  email: string,
  vehicle: NonNullable<UserAccount["vehicle"]>,
) {
  const res = await fetch("/api/auth/profile/vehicle", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, vehicle }),
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload?.message ?? "Failed to save vehicle");
  }
  return userSchema.parse(payload.user) as UserAccount;
}

export async function saveEmergencyContact(
  email: string,
  emergencyContact: NonNullable<UserAccount["emergencyContact"]>,
) {
  const res = await fetch("/api/auth/profile/emergency", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, emergencyContact }),
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload?.message ?? "Failed to save emergency contact");
  }
  return userSchema.parse(payload.user) as UserAccount;
}
