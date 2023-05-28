import { Request, Response } from 'express';
import { prisma } from '../utils';
import { validatePubkey } from '../utils/validatePubkey';
import { checkUserGh } from '../utils/checkUserGh';


export const verifyUser = async (req: Request, res: Response) => {
  const { signature, publicKey } = req.body;
  const { authorization } = req.headers


  if (!authorization) {
    return res.status(401).json({ message: "Github token missing" })
  }

  if (!validatePubkey(publicKey)) {
    return res.status(400).json({ message: 'Invalid public key' });
  }

  try {
    const ghRes = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": "Bearer " + authorization
      }
    })
    const github = await ghRes.json()
    const username = github.login
    const check = checkUserGh(username)
    if (!check) {
      return res
        .status(400)
        .json({ message: 'Github username do not exist in the list' });
    }

    const user = await prisma.user.findFirst({
      where: {
        github: username
      }
    })
    if (user?.signature && user.wallet) {
      return res.status(409).json({ message: 'User already exists' });
    }

    await prisma.user.create({
      data: {
        github: username,
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
