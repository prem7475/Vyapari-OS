import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { getDocumentsController, uploadDocumentController } from './documents.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', getDocumentsController);
router.post('/', uploadDocumentController);

export default router;
