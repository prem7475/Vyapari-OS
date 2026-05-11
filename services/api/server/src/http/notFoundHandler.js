export function notFoundHandler(req, res) {
  return res.status(404).json({
    ok: false,
    error: { code: "NOT_FOUND", message: `Route not found: ${req.method} ${req.originalUrl}` },
    requestId: req.requestId,
  });
}

