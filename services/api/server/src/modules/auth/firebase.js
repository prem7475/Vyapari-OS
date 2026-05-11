import admin from "firebase-admin";

import { env } from "../../config/env.js";

let firebaseApp = null;

export function getFirebaseAdmin() {
  if (firebaseApp) return firebaseApp;

  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
    throw new Error("Firebase admin env not configured (FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY)");
  }

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

  return firebaseApp;
}

export async function verifyIdToken(firebaseIdToken) {
  const app = getFirebaseAdmin();
  return await app.auth().verifyIdToken(firebaseIdToken);
}

