import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from './env.ts';

const s3Client = new S3Client({
  region: env.awsRegion,
  credentials:
    env.awsAccessKeyId && env.awsSecretAccessKey
      ? {
          accessKeyId: env.awsAccessKeyId,
          secretAccessKey: env.awsSecretAccessKey,
        }
      : undefined,
});

export async function uploadToS3(key: string, body: Buffer | Uint8Array | string, contentType = 'application/octet-stream', metadata = {}) {
  const command = new PutObjectCommand({
    Bucket: env.awsS3Bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    Metadata: metadata,
  });

  await s3Client.send(command);
  return { bucket: env.awsS3Bucket, key };
}

export async function getSignedUrlForKey(key: string, expiresInSeconds = 900) {
  const command = new GetObjectCommand({
    Bucket: env.awsS3Bucket,
    Key: key,
  });
  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
}

export async function deleteFromS3(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: env.awsS3Bucket,
    Key: key,
  });
  await s3Client.send(command);
}
