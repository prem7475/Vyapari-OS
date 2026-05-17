import { Router } from 'express';
import { getMeController, updateMeController } from './users.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);
router.get('/me', getMeController);
router.put('/me', updateMeController);

export default router;
