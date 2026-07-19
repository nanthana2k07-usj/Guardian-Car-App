import { createFileRoute } from "@tanstack/react-router";
import { POST as handlePost } from "@/server/api/auth/profile";

export const Route = createFileRoute("/api/auth/profile/emergency")({
  server: {
    handlers: {
      POST: async ({ request }) => handlePost(request),
    },
  },
});
