import { Request, Response } from 'express';
import { prisma } from '../utils';
import { validatePubkey } from '../utils/validatePubkey';
import { checkUserGh } from '../utils/checkUserGh';


export const verifyUser = async (req: Request, res: Response) => {
  const { signature, github, publicKey } = req.body;

  if (!validatePubkey(publicKey)) {
    return res.status(400).json({ message: 'Invalid public key' });
  }

  try {
    const check = checkUserGh(github)
    if (!check) {
      return res
        .status(400)
        .json({ message: 'Github username do not exist in the list' });
    }

    const user = await prisma.user.findFirst({
      where: {
        github
      }
    })
    if (user?.signature && user.wallet) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await prisma.user.create({
      data: {
        github,
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
