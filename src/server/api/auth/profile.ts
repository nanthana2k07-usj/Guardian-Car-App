import { z } from "zod";
import { normalizeEmail, updateUser } from "@/server/user-store";

const vehicleSchema = z.object({
  email: z.string().email(),
  vehicle: z.object({
    ownerName: z.string().min(1),
    number: z.string().min(1),
    brand: z.string().min(1),
    model: z.string().min(1),
    type: z.string().min(1),
    color: z.string().min(1),
    deviceId: z.string().min(1),
  }),
});

const emergencySchema = z.object({
  email: z.string().email(),
  emergencyContact: z.object({
    name: z.string().min(1),
    relationship: z.string().min(1),
    phone: z.string().min(6),
    altPhone: z.string().optional(),
  }),
});

export async function POST(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  try {
    if (pathname.endsWith("/vehicle")) {
      const body = vehicleSchema.parse(await req.json());
      const user = await updateUser(normalizeEmail(body.email), { vehicle: body.vehicle });
      if (!user) {
        return new Response(JSON.stringify({ ok: false, message: "User not found" }), {
          status: 404,
          headers: { "content-type": "application/json" },
        });
      }
      return Response.json({ ok: true, user: publicUser(user) });
    }

    if (pathname.endsWith("/emergency")) {
      const body = emergencySchema.parse(await req.json());
      const user = await updateUser(normalizeEmail(body.email), { emergencyContact: body.emergencyContact });
      if (!user) {
        return new Response(JSON.stringify({ ok: false, message: "User not found" }), {
          status: 404,
          headers: { "content-type": "application/json" },
        });
      }
      return Response.json({ ok: true, user: publicUser(user) });
    }

    return new Response(JSON.stringify({ ok: false, message: "Unknown endpoint" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return new Response(JSON.stringify({ 
      ok: false, 
      message: error instanceof Error ? error.message : "Internal server error" 
    }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

function publicUser(user: {
  email: string;
  name: string;
  mobile: string;
  vehicle?: unknown;
  emergencyContact?: unknown;
  createdAt: string;
}) {
  return {
    email: user.email,
    name: user.name,
    mobile: user.mobile,
    vehicle: user.vehicle,
    emergencyContact: user.emergencyContact,
    createdAt: user.createdAt,
  };
}
