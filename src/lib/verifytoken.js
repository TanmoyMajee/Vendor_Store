
export async function verifyIdToken(idToken) {
  try {
    // Use Firebase's REST API to verify the token
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idToken: idToken,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Firebase verification failed:', data);
      return null;
    }

    if (!data.users || data.users.length === 0) {
      console.error('No user found in token');
      return null;
    }

    const user = data.users[0];
    
    // Return user data in format similar to firebase-admin
    return {
      uid: user.localId,
      email: user.email,
      email_verified: user.emailVerified === 'true',
      name: user.displayName,
      picture: user.photoUrl,
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}