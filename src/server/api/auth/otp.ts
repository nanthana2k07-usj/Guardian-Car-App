import { z } from "zod";
import { sendOtpToEmail, verifyOtpCode } from "@/server/api/auth/otp-core";
import { getUser, normalizeEmail, verifyUser } from "@/server/user-store";

const sendSchema = z.object({
  email: z.string().email(),
  purpose: z.enum(["login", "signup"]).default("login"),
});

const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().regex(/^\d{6}$/),
});

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname.endsWith("/send")) {
    try {
      const body = sendSchema.parse(await req.json());
      const email = normalizeEmail(body.email);

      if (body.purpose === "login") {
        const user = await getUser(email);
        if (!user?.verified) {
          return jsonResponse(
            {
              ok: false,
              code: "USER_NOT_FOUND",
              message: "No verified account found for this email address.",
            },
            404,
          );
        }
      }

      const result = await sendOtpToEmail(email);
      if (!result.ok) {
        return jsonResponse(result, result.code === "OTP_COOLDOWN" ? 429 : 400);
      }

      return Response.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return jsonResponse(
          {
            ok: false,
            code: "INVALID_REQUEST",
            message: "Please provide a valid email address.",
            errors: error.errors,
          },
          400,
        );
      }

      return jsonResponse(
        {
          ok: false,
          code: "OTP_SEND_FAILED",
          message:
            error instanceof Error
              ? error.message
              : "Failed to send OTP email.",
        },
        500,
      );
    }
  }

  if (pathname.endsWith("/verify")) {
    try {
      const body = verifySchema.parse(await req.json());
      const email = normalizeEmail(body.email);

      const result = verifyOtpCode(email, body.code);
      if (!result.ok) {
        return jsonResponse(result, 400);
      }

      // After successful OTP verification, check if user exists in MongoDB.
      let user = await getUser(email);

      if (!user) {
        return Response.json({
          ok: true,
          message: result.message,
          email,
          user: null,
          needsSignup: true,
        });
      }

      if (!user.verified) {
        user = await verifyUser(email);
      }

      return Response.json({
        ok: true,
        message: result.message,
        user: {
          email: user.email,
          name: user.name,
          mobile: user.mobile,
          vehicle: user.vehicle,
          emergencyContact: user.emergencyContact,
          createdAt: user.createdAt,
        },
        needsSignup: false,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return jsonResponse(
          {
            ok: false,
            code: "INVALID_REQUEST",
            message: "Please provide a valid email address and 6-digit OTP.",
            errors: error.errors,
          },
          400,
        );
      }

      return jsonResponse(
        {
          ok: false,
          code: "OTP_VERIFY_FAILED",
          message:
            error instanceof Error ? error.message : "Failed to verify OTP.",
        },
        500,
      );
    }
  }

  return jsonResponse(
    { ok: false, code: "NOT_FOUND", message: "Unknown OTP endpoint" },
    404,
  );
}
