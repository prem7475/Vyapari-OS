import { Router } from "express";

import { authRouter } from "./modules/auth/router.js";

export function routesV1() {
  const router = Router();

  router.use("/auth", authRouter());

  return router;
}

