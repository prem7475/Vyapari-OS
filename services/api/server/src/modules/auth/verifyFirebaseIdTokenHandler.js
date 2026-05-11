import { upsertUserFromFirebase } from "./userUpsert.js";
import { issueTokens } from "./tokens.js";

export async function verifyFirebaseIdTokenHandler(req, res, next) {
  try {
    const { firebase_id_token: firebaseIdToken } = req.body;

    const user = await upsertUserFromFirebase(firebaseIdToken);
    const tokens = issueTokens({ userId: user.id, role: user.role });

    return res.status(200).json({
      ok: true,
      user,
      tokens,
    });
  } catch (err) {
    return next(err);
  }
}

