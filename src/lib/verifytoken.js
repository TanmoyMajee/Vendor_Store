import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

const app = initializeApp({ credential: applicationDefault() });

export async function verifyIdToken(token) {
  try {
    const decodedToken = await getAuth(app).verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
}