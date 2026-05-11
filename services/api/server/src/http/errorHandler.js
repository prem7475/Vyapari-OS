import { HttpError } from "./errors.js";
import { logger } from "../utils/logger.js";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const requestId = req.requestId;

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      ok: false,
      error: { code: err.code, message: err.message, details: err.details },
      requestId,
    });
  }

  logger.error({ err, requestId }, "unhandled_error");

  return res.status(500).json({
    ok: false,
    error: { code: "INTERNAL", message: "Something went wrong" },
    requestId,
  });
}

