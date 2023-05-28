import express, { json } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyUser } from './controllers';
import { prisma } from './utils';
import { uploadGithubUsername } from './controllers/upload';
dotenv.config();

const app = express();
const port = process.env.PORT || '8000';

app.use(cors());
app.use(json());

app.get('/', (req: Request, res: Response) => {
  return res.send('gm');
});
app.post('/verify', verifyUser);
app.post('/upload', uploadGithubUsername);

app.listen(port, () => {
  prisma.$connect();
  return console.log(`Server is listening on ${port}`);
});
