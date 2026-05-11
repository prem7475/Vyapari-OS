import { logger } from "../utils/logger.js";

export function requestLoggerMiddleware() {
  return function requestLogger(req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
      const ms = Date.now() - start;
      logger.info(
        {
          requestId: req.requestId,
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          ms,
        },
        "http",
      );
    });
    next();
  };
}

