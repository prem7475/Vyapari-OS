import rateLimit from "express-rate-limit";

export function rateLimitMiddleware() {
  return rateLimit({
    windowMs: 60_000,
    max: 240,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip,
    message: { ok: false, error: { code: "TOO_MANY_REQUESTS", message: "Rate limit exceeded" } },
  });
}

