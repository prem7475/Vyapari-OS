import { ok } from '../../utils/response.js';
import { adminAuthService } from './adminAuth.service.js';

export const adminAuthController = {
  async login(req, res) {
    const result = await adminAuthService.login({
      email: req.body.email,
      password: req.body.password,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
    return ok(res, result);
  },

  async refresh(req, res) {
    const result = await adminAuthService.refresh({ refreshToken: req.body.refreshToken });
    return ok(res, result);
  },

  async logout(req, res) {
    const result = await adminAuthService.logout({ refreshToken: req.body.refreshToken });
    return ok(res, result);
  },

  async me(req, res) {
    const result = await adminAuthService.me({ adminUserId: req.auth.adminUserId });
    return ok(res, result);
  },
};

