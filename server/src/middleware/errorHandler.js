import { ApiError } from '../utils/apiError.js';
import { logger } from '../config/logger.js';

export function errorHandler(err, req, res, next) {
  const apiErr =
    err instanceof ApiError
      ? err
      : new ApiError(500, 'Internal Server Error', {
          code: 'INTERNAL_ERROR',
          expose: false,
        });

  const status = apiErr.statusCode || 500;

  const logPayload = {
    status,
    code: apiErr.code,
    message: apiErr.message,
    details: apiErr.details,
    path: req.originalUrl,
    method: req.method,
    requestId: req.id,
  };

  if (status >= 500) logger.error({ err, ...logPayload }, 'request_error');
  else logger.warn({ err, ...logPayload }, 'request_error');

  return res.status(status).json({
    ok: false,
    error: {
      code: apiErr.code || (status >= 500 ? 'INTERNAL_ERROR' : 'BAD_REQUEST'),
      message: apiErr.expose ? apiErr.message : 'Internal Server Error',
      details: apiErr.expose ? apiErr.details : undefined,
      requestId: req.id,
    },
  });
}

