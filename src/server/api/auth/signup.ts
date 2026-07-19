import { z } from "zod";
import {
  createPendingUser,
  emailTaken,
  getUser,
  normalizeEmail,
} from "@/server/user-store";
import { sendOtpToEmail } from "@/server/api/auth/otp-core";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = signupSchema.parse(await req.json());
    const email = normalizeEmail(body.email);

    console.log("Signup request for:", email);

    if (await emailTaken(email)) {
      const existing = await getUser(email);
      if (existing?.verified) {
        return new Response(
          JSON.stringify({
            ok: false,
            message:
              "An account with this email already exists. Please login instead.",
          }),
          { status: 409, headers: { "content-type": "application/json" } },
        );
      }
    }

    await createPendingUser(body);
    console.log("Pending user created for:", email);

    const otpResult = await sendOtpToEmail(email);
    if (!otpResult.ok) {
      return new Response(JSON.stringify(otpResult), {
        status: otpResult.code === "OTP_COOLDOWN" ? 429 : 400,
        headers: { "content-type": "application/json" },
      });
    }
    console.log("OTP sent to:", email);

    return Response.json({
      ok: true,
      message:
        "Account created successfully. OTP sent to your registered email address.",
      otp: otpResult,
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          ok: false,
          message: "Invalid input data",
          errors: error.errors,
        }),
        { status: 400, headers: { "content-type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        ok: false,
        message:
          error instanceof Error ? error.message : "Failed to create account",
      }),
      { status: 500, headers: { "content-type": "application/json" } },
    );
  }
}
