import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  const a = 35;
  res.send(a);
});
console.log(process.cwd());

export default app;
