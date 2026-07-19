import { createFileRoute } from "@tanstack/react-router";
import { POST as handlePost } from "@/server/api/auth/otp";

export const Route = createFileRoute("/api/auth/otp/send")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        return handlePost(request);
      },
    },
  },
});
