// Database access is not configured for this deployment.
// Add Drizzle + D1 setup here if a Cloudflare Workers runtime is available.
export function getDb(): never {
  throw new Error("Database is not configured for this environment.");
}
