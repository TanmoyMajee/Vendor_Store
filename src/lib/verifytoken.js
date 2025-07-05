import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';
import admin from 'firebase-admin';
import path from 'path';

// Option 1: Direct file path (absolute)
// const serviceAccountPath = 'C:/path/to/your/serviceAccountKey.json';

// Option 2: Relative to project root
// const serviceAccountPath = './serviceAccountKey.json';

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID, 
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
});

export async function verifyIdToken(token) {
  try {
    console.log('🔍 Attempting to verify token...');
    const decodedToken = await getAuth(app).verifyIdToken(token);
    console.log('✅ Token verified successfully');
    return decodedToken;
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return null;
  }
}