import * as jose from 'jose';

export const signSupabaseToken = async (auth0User: { sub: string }) => {
  const payload = {
    role: 'authenticated',
    aud: 'authenticated',
    sub: auth0User.sub,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const secret = import.meta.env.VITE_SUPABASE_JWT_SECRET;
  if (!secret) throw new Error('Missing JWT secret');

  const secretBytes = new TextEncoder().encode(secret);
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .sign(secretBytes);
}; 