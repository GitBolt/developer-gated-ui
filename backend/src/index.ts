import express, { json } from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import dotenv from 'dotenv';
import { verifyUser } from './controllers';
import { prisma } from './utils';
import helmet from 'helmet';

dotenv.config();

const app = express();
const port = process.env.PORT || '8000';

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
morganBody(app, {
  noColors: true,
  logResponseBody: false,
});

app.get('/', (req: Request, res: Response) => {
  return res.send('gm');
});
app.post('/verify', verifyUser);


app.listen(port, () => {
  prisma.$connect();
  return console.log(`Server is listening on ${port}`);
});
