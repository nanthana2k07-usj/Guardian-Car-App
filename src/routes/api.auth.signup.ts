import { createFileRoute } from "@tanstack/react-router";
import { POST as handlePost } from "@/server/api/auth/signup";

export const Route = createFileRoute("/api/auth/signup")({
  server: {
    handlers: {
      POST: async ({ request }) => handlePost(request),
    },
  },
});
