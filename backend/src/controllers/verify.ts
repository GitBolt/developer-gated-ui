import { Request, Response } from 'express';
import { prisma } from '../utils';
import { validatePubkey } from '../utils/validatePubkey';
import { checkUserGh } from '../utils/checkUserGh';

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { signature, publicKey } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: 'Github token missing' });
      return;
    }

    if (!validatePubkey(publicKey)) {
      res.status(400).json({ message: 'Invalid public key' });
      return;
    }

    const ghRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });

    if (!ghRes.ok) {
      res.status(400).json({ message: 'Failed to fetch Github user' });
      return;
    }

    const github = await ghRes.json();
    const { login: username } = github;

    if (!checkUserGh(username)) {
      res.status(400).json({ message: 'Github username does not exist in the list' });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        github: username,
      },
    });

    if (user?.signature && user.wallet) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    await prisma.user.create({
      data: {
        github: username,
        signature,
        wallet: publicKey,
      },
    });

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};
