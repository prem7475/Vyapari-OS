import { Router } from "express";
import { z } from "zod";

import { validateBody } from "../../utils/validate.js";
import { verifyFirebaseIdTokenHandler } from "./verifyFirebaseIdTokenHandler.js";

const verifySchema = z.object({
  firebase_id_token: z.string().min(10),
  device: z
    .object({
      platform: z.string().optional(),
      model: z.string().optional(),
      appVersion: z.string().optional(),
    })
    .optional(),
});

export function authRouter() {
  const router = Router();

  router.post("/otp/verify", validateBody(verifySchema), verifyFirebaseIdTokenHandler);

  return router;
}

