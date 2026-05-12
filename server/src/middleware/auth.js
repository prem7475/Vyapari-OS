import { ApiError } from '../utils/apiError.js';
import { verifyAccessToken } from '../services/tokenService.js';

export function requireUserAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });

    const payload = verifyAccessToken(token, { audience: 'user' });
    req.auth = {
      kind: 'user',
      userId: payload.sub,
      role: payload.role,
    };
    return next();
  } catch (e) {
    return next(e);
  }
}

export function requireAdminAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(401, 'Unauthorized', { code: 'UNAUTHORIZED' });

    const payload = verifyAccessToken(token, { audience: 'admin' });
    req.auth = {
      kind: 'admin',
      adminUserId: payload.sub,
      role: payload.role,
    };
    return next();
  } catch (e) {
    return next(e);
  }
}

export function requireAdminRoles(roles) {
  return (req, res, next) => {
    if (!req.auth || req.auth.kind !== 'admin') {
      return next(new ApiError(403, 'Forbidden', { code: 'FORBIDDEN' }));
    }
    if (!roles.includes(req.auth.role)) {
      return next(new ApiError(403, 'Forbidden', { code: 'FORBIDDEN' }));
    }
    return next();
  };
}

