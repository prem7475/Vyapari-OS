import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import prisma from '../../config/db.js';
import { env } from '../../config/env.js';

const s3Client = new S3Client({
  region: env.awsRegion,
  credentials: env.awsAccessKeyId && env.awsSecretAccessKey ? {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey,
  } : undefined,
});

function buildDocumentKey(userId, filename) {
  const timestamp = Date.now();
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `documents/${userId}/${timestamp}-${sanitized}`;
}

export async function uploadDocument(userId, file, category, serviceRequestId) {
  const key = buildDocumentKey(userId, file.originalname);
  const command = new PutObjectCommand({
    Bucket: env.awsS3Bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    Metadata: {
      originalName: file.originalname,
      category: category || 'general',
      userId,
      serviceRequestId: serviceRequestId ?? '',
    },
  });

  await s3Client.send(command);

  return prisma.document.create({
    data: {
      userId,
      serviceRequestId,
      category,
      originalName: file.originalname,
      storageKey: key,
      fileType: file.mimetype,
      fileSize: file.size,
      status: 'UPLOADED',
    },
  });
}

export async function getDocuments(userId, category) {
  const documents = await prisma.document.findMany({
    where: {
      userId,
      category: category ? category : undefined,
    },
    orderBy: { createdAt: 'desc' },
  });

  return Promise.all(
    documents.map(async (document) => ({
      ...document,
      downloadUrl: await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: env.awsS3Bucket,
          Key: document.storageKey,
        }),
        { expiresIn: 900 },
      ),
    })),
  );
}
