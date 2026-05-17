import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { createRequestController, getRequestController, listRequestsController, updateRequestController } from './requests.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', listRequestsController);
router.get('/:id', getRequestController);
router.post('/', createRequestController);
router.put('/:id', updateRequestController);

export default router;
