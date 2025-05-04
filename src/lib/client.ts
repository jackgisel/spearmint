import type { AppRouter } from "@/server";
import { createClient } from "jstack";

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */
export const client = createClient<AppRouter>({
  baseUrl: getBaseUrl() + "/api",
});

function getBaseUrl() {
  return process.env.BASE_URL || `http://localhost:8080`;
}
