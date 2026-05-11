import { verifyIdToken } from "./firebase.js";
import { pool } from "../../db/pool.js";
import { httpErrors } from "../../http/errors.js";

function normalizePhone(phone) {
  return String(phone || "").trim();
}

export async function upsertUserFromFirebase(firebaseIdToken) {
  const decoded = await verifyIdToken(firebaseIdToken);

  const firebaseUid = decoded.uid;
  const phone = normalizePhone(decoded.phone_number);
  const email = decoded.email || null;
  const name = decoded.name || null;

  if (!phone) throw httpErrors.badRequest("Firebase token missing phone_number");

  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      INSERT INTO users (phone_e164, email, full_name, firebase_uid, last_login_at)
      VALUES ($1, $2, $3, $4, now())
      ON CONFLICT (phone_e164)
      DO UPDATE SET
        email = COALESCE(EXCLUDED.email, users.email),
        full_name = COALESCE(EXCLUDED.full_name, users.full_name),
        firebase_uid = COALESCE(EXCLUDED.firebase_uid, users.firebase_uid),
        last_login_at = now(),
        updated_at = now()
      RETURNING id, phone_e164, email, full_name, role, created_at, updated_at
      `,
      [phone, email, name, firebaseUid],
    );

    return result.rows[0];
  } catch (err) {
    // avoid leaking DB errors
    throw httpErrors.internal("User upsert failed");
  } finally {
    client.release();
  }
}

