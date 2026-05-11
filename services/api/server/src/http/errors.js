export class HttpError extends Error {
  /**
   * @param {number} status
   * @param {string} code
   * @param {string} message
   * @param {unknown} details
   */
  constructor(status, code, message, details = undefined) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const httpErrors = {
  badRequest(message, details) {
    return new HttpError(400, "BAD_REQUEST", message, details);
  },
  unauthorized(message = "Unauthorized") {
    return new HttpError(401, "UNAUTHORIZED", message);
  },
  forbidden(message = "Forbidden") {
    return new HttpError(403, "FORBIDDEN", message);
  },
  notFound(message = "Not found") {
    return new HttpError(404, "NOT_FOUND", message);
  },
  conflict(message = "Conflict", details) {
    return new HttpError(409, "CONFLICT", message, details);
  },
  tooManyRequests(message = "Too many requests") {
    return new HttpError(429, "TOO_MANY_REQUESTS", message);
  },
  internal(message = "Internal server error") {
    return new HttpError(500, "INTERNAL", message);
  },
};

