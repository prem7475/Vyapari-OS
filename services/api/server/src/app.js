import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import { requestIdMiddleware } from "./middleware/requestIdMiddleware.js";
import { requestLoggerMiddleware } from "./middleware/requestLoggerMiddleware.js";
import { rateLimitMiddleware } from "./middleware/rateLimitMiddleware.js";
import { notFoundHandler } from "./http/notFoundHandler.js";
import { errorHandler } from "./http/errorHandler.js";
import { routesV1 } from "./routesV1.js";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
    }),
  );

  app.use(requestIdMiddleware());
  app.use(requestLoggerMiddleware());
  app.use(rateLimitMiddleware());

  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true, service: "vyapari-api" });
  });

  app.use("/v1", routesV1());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

