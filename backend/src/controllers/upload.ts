import { Request, Response } from 'express';
import { Data } from '../utils/github';
import { Prisma } from '@prisma/client';
import { prisma } from '../utils';

export const uploadGithubUsername = async (_req: Request, res: Response) => {
  try {
    const dbData: Prisma.UserCreateInput[] = [];

    Data.forEach((user) => {
      dbData.push({
        github:
          typeof user.Github_handle === 'number'
            ? user.Github_handle.toString()
            : user.Github_handle,
      });
    });

    await prisma.user.createMany({
      data: dbData,
    });
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
