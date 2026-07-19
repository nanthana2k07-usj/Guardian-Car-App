import { createHmac, randomInt } from "crypto";
import {
  clearOtp,
  consumeAttempt,
  getOtp,
  purgeExpired,
  upsertOtp,
} from "@/server/otp-store";

type EnvSource = {
  process?: {
    env?: Record<string, string | undefined>;
  };
  ENV?: Record<string, string | undefined>;
};

function env(name: string) {
  const runtime = globalThis as EnvSource;
  return runtime.process?.env?.[name] ?? runtime.ENV?.[name];
}

export function otpTtlMs() {
  const v = env("OTP_TTL_MS");
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 5 * 60 * 1000;
}

export function maxAttempts() {
  const v = env("OTP_MAX_ATTEMPTS");
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 5;
}

export function otpCooldownMs() {
  const v = env("OTP_RESEND_COOLDOWN_MS");
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 30_000;
}

function generateCode() {
  return String(randomInt(100000, 1000000));
}

export function codeHash(code: string) {
  const secret = env("OTP_HASH_SECRET") || "dev-otp-secret";
  return createHmac("sha256", secret).update(code).digest("hex");
}

function buildEmailHtml(code: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GuardianCar Verification Code</title>
</head>
<body style="margin:0;padding:0;background-color:#0B1120;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B1120;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#6C63FF 0%,#3ECFCF 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">GuardianCar</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">AI Vehicle Theft Detection &amp; Protection</p>
          </td>
        </tr>
        <tr>
          <td style="background:#131C30;padding:40px;">
            <h2 style="margin:0 0 8px;color:#F1F5F9;font-size:20px;">Verify Your Email Address</h2>
            <p style="margin:0 0 28px;color:#94A3B8;font-size:15px;">Use the secure code below to complete verification.</p>
            <div style="background:#0B1120;border:2px solid #6C63FF;border-radius:12px;padding:28px;text-align:center;margin-bottom:28px;">
              <div style="font-size:42px;font-weight:800;letter-spacing:12px;color:#6C63FF;font-family:monospace;">${code}</div>
              <p style="margin:10px 0 0;color:#64748B;font-size:13px;">Expires in <strong style="color:#F97316;">5 minutes</strong></p>
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style="background:#0B1120;padding:24px 40px;border-radius:0 0 16px 16px;">
            <p style="margin:0;color:#334155;font-size:12px;">&copy; 2026 GuardianCar Technologies</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildEmailText(code: string): string {
  return [
    "GuardianCar — Email Verification",
    "",
    `Your one-time verification code is: ${code}`,
    "",
    "This code expires in 5 minutes.",
    "",
    "— GuardianCar Security Team",
  ].join("\n");
}

async function sendEmailOtp(toEmail: string, code: string) {
  const mode = (env("OTP_EMAIL_MODE") || "console").toLowerCase();

  if (mode === "console") {
    console.log(`[OTP] send to ${toEmail}: ${code}`);
    return;
  }

  if (mode === "resend") {
    const apiKey = env("RESEND_API_KEY");
    if (!apiKey) throw new Error("Resend API key missing.");
    const fromEmail = env("RESEND_FROM") || "onboarding@resend.dev";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: "Your GuardianCar verification code",
        text: buildEmailText(code),
        html: buildEmailHtml(code),
      }),
    });
    if (!res.ok) throw new Error(`Resend API failed: ${await res.text()}`);
    return;
  }

  if (mode === "smtp") {
    const nodemailer = await import("nodemailer");
    const SMTP_HOST = env("SMTP_HOST");
    const SMTP_PORT = env("SMTP_PORT");
    const SMTP_USER = env("SMTP_USER");
    const SMTP_PASS = env("SMTP_PASS");
    const SMTP_FROM = env("SMTP_FROM");
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
      throw new Error("SMTP env vars missing.");
    }
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    try {
      await transporter.sendMail({
        from: SMTP_FROM,
        to: toEmail,
        subject: "Your GuardianCar verification code",
        text: buildEmailText(code),
        html: buildEmailHtml(code),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("ENOTFOUND") || message.includes("getaddrinfo")) {
        throw new Error(
          "SMTP host lookup failed. This project is using a Cloudflare-style runtime where direct Gmail SMTP may not be available. Use a Node server for Gmail SMTP or switch OTP_EMAIL_MODE to resend for deployed builds.",
        );
      }
      throw error;
    }
    return;
  }

  throw new Error(`Unknown OTP_EMAIL_MODE: ${mode}`);
}

function ttlSeconds() {
  return Math.ceil(otpTtlMs() / 1000);
}

function cooldownSeconds(ms: number) {
  return Math.max(1, Math.ceil(ms / 1000));
}

export async function sendOtpToEmail(email: string) {
  purgeExpired();

  const rec = getOtp(email);
  const now = Date.now();
  if (rec && now - rec.lastSentAt < otpCooldownMs()) {
    return {
      ok: false as const,
      code: "OTP_COOLDOWN",
      message: `Please wait ${cooldownSeconds(otpCooldownMs() - (now - rec.lastSentAt))} seconds before requesting another OTP.`,
      retryAfterSeconds: cooldownSeconds(
        otpCooldownMs() - (now - rec.lastSentAt),
      ),
    };
  }

  const code = generateCode();
  const hashed = codeHash(code);

  // Only persist the OTP after the email is sent successfully so failed sends
  // do not leave behind a code the user never received.
  await sendEmailOtp(email, code);

  upsertOtp({
    email,
    codeHash: hashed,
    ttlMs: otpTtlMs(),
    maxAttempts: maxAttempts(),
    now,
  });

  return {
    ok: true as const,
    email,
    message: "OTP sent successfully to the registered email address.",
    expiresInSeconds: ttlSeconds(),
    resendAvailableInSeconds: cooldownSeconds(otpCooldownMs()),
  };
}

export function verifyOtpCode(email: string, code: string) {
  purgeExpired();

  const rec = getOtp(email);
  if (!rec) {
    return {
      ok: false as const,
      code: "OTP_NOT_FOUND",
      message: "OTP not found. Please request a new code.",
    };
  }

  if (Date.now() > rec.expiresAt) {
    clearOtp(email);
    return {
      ok: false as const,
      code: "OTP_EXPIRED",
      message: "OTP expired. Please request a new code.",
    };
  }

  const inputHash = codeHash(code);
  if (inputHash !== rec.codeHash) {
    const next = consumeAttempt(email);
    if (next && next.attemptsLeft <= 0) {
      clearOtp(email);
      return {
        ok: false as const,
        code: "OTP_ATTEMPTS_EXCEEDED",
        message: "Too many invalid attempts. Please request a new code.",
      };
    }
    return {
      ok: false as const,
      code: "OTP_INVALID",
      message: "Invalid OTP. Please try again.",
      attemptsLeft: next?.attemptsLeft ?? maxAttempts(),
    };
  }

  clearOtp(email);
  return {
    ok: true as const,
    message: "OTP verified successfully.",
  };
}
