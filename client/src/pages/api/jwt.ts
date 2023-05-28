// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token) {
    // Signed in
    console.log('JSON Web Token', JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
