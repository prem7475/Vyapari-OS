import { authService } from './auth.service.js';
import { ok } from '../../utils/response.js';

export const authController = {
  async firebaseLogin(req, res) {
    const result = await authService.loginWithFirebase({
      idToken: req.body.idToken,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
    return ok(res, result);
  },

  async refresh(req, res) {
    const result = await authService.refresh({ refreshToken: req.body.refreshToken });
    return ok(res, result);
  },

  async logout(req, res) {
    const result = await authService.logout({ refreshToken: req.body.refreshToken });
    return ok(res, result);
  },

  async me(req, res) {
    const result = await authService.me({ userId: req.auth.userId });
    return ok(res, result);
  },
};

