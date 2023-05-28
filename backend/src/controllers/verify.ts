import { Request, Response } from 'express';
import * as anchor from '@coral-xyz/anchor';
import { prisma } from '../utils';
import { validatePubkey } from '../utils/validatePubkey';
export const verifyUser = async (req: Request, res: Response) => {
  const { signature, github, publicKey } = req.body;

  console.log(req.body);

  if (!validatePubkey(publicKey)) {
    return res.status(400).json({ message: 'Invalid public key' });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        github: github,
      },
    });
    if (!user) {
      return res
        .status(204)
        .json({ message: 'Github username do not exist in the list' });
    }
    if (user?.signature && user.wallet) {
      return res.status(200).json({ message: 'User already exists' });
    }

    await prisma.user.update({
      where: {
        github: github,
      },
      data: {
        signature: signature,
        wallet: publicKey,
      },
    });

    return res.status(200).json({ message: 'User verified successfully' });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
