import multer from 'multer';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { uploadDocument, getDocuments } from './documents.service.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

export const getDocumentsController = asyncHandler(async (req, res) => {
  const userId = req.auth?.userId;
  const category = req.query.category;
  const documents = await getDocuments(userId, category);
  res.status(200).json({ data: documents });
});

export const uploadDocumentController = [
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const userId = req.auth?.userId;
    const category = req.body.category || 'general';
    if (!req.file) {
      return res.status(400).json({ message: 'Document file is required' });
    }
    const document = await uploadDocument(userId, req.file, category, req.body.serviceRequestId);
    res.status(201).json({ data: document });
  }),
];
