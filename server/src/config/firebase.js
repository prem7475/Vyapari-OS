import admin from 'firebase-admin';
import { env } from './env.js';

let firebaseApp;

export function getFirebaseAdmin() {
  if (firebaseApp) return firebaseApp;

  const { projectId, clientEmail, privateKey } = env.firebase;
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin env not configured (FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY).');
  }

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  return firebaseApp;
}

export async function verifyFirebaseIdToken(idToken) {
  getFirebaseAdmin();
  return admin.auth().verifyIdToken(idToken, true);
}

