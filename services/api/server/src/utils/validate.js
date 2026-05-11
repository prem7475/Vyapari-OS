import { httpErrors } from "../http/errors.js";

export function validateBody(schema) {
  return function validate(req, _res, next) {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return next(httpErrors.badRequest("Validation failed", parsed.error.flatten()));
    req.body = parsed.data;
    return next();
  };
}

