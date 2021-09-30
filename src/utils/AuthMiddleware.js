import { getSession } from 'next-auth/client';

export const authinticated = (fn) => async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    return await fn(req, res);
  } else {
    res.status(404).json({ message: 'You are not autherized to perform this action' });
  }
};
