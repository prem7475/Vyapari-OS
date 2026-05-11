import jwt from "jsonwebtoken";

import { env } from "../../config/env.js";

export function issueTokens({ userId, role }) {
  const accessToken = jwt.sign(
    { sub: userId, role, typ: "access" },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_TTL_SECONDS },
  );

  const refreshToken = jwt.sign(
    { sub: userId, role, typ: "refresh" },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_TTL_SECONDS },
  );

  return {
    accessToken,
    refreshToken,
    expiresInSeconds: env.JWT_ACCESS_TTL_SECONDS,
  };
}

