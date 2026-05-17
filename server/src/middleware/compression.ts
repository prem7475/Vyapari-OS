import compression from 'compression';

export function compressionMiddleware() {
  return compression({
    level: 6,
    threshold: 1024,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  });
}

export function cachingHeaders(req, res, next) {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
}
