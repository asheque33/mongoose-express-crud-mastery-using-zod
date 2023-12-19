import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', userRouter);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Localhost API!',
  });
};
app.get('/', getAController);

console.log(process.cwd());

export default app;
