import { Request, Response } from 'express';
import multer from 'multer';
import asyncHandler from '../../utils/async-handler.js';
import { getDocuments, uploadDocument } from './documents.service.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

export const getDocumentsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const category = req.query.category as string | undefined;
  const documents = await getDocuments(userId, category);
  res.status(200).json({ data: documents });
});

export const uploadDocumentController = [
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    const category = (req.body.category as string) || 'PAN';
    if (!req.file) {
      return res.status(400).json({ message: 'Document file is required' });
    }
    const document = await uploadDocument(userId, req.file, category, req.body.serviceRequestId);
    res.status(201).json({ data: document });
  }),
];
