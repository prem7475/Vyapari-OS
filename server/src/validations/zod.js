import { ApiError } from '../utils/apiError.js';

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new ApiError(400, 'Validation failed', {
          code: 'VALIDATION_ERROR',
          details: result.error.flatten(),
        }),
      );
    }
    req.body = result.data;
    return next();
  };
}

