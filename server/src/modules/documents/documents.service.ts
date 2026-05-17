import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../../config/env.js';
import prisma from '../../config/db.js';
import { nanoid } from 'nanoid';

const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

function buildKey(userId: string, originalName: string) {
  const prefix = `documents/${userId}/${nanoid(10)}-${originalName}`;
  return prefix.replace(/\s+/g, '-').toLowerCase();
}

export async function getDocuments(userId: string, category?: string) {
  return prisma.uploadedDocument.findMany({
    where: { userId, category: category?.toUpperCase() ?? undefined },
    orderBy: { uploadedAt: 'desc' },
  });
}

export async function uploadDocument(userId: string, file: Express.Multer.File, category: string, serviceRequestId?: string) {
  const key = buildKey(userId, file.originalname);
  const command = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private',
  });

  await s3.send(command);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  const document = await prisma.uploadedDocument.create({
    data: {
      userId,
      serviceRequestId,
      fileName: file.originalname,
      contentType: file.mimetype,
      s3Key: key,
      url,
      category: category.toUpperCase(),
    },
  });

  return document;
}
