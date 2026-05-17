import express from 'express';
import { requireUserAuth } from '../../middleware/auth.js';
import { getDocumentsController, uploadDocumentController } from './documents.controller.js';

const router = express.Router();

router.use(requireUserAuth);
router.get('/', getDocumentsController);
router.post('/', uploadDocumentController);

export default router;
