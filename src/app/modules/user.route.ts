import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

// userRouter will call the userController
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getSingleUser);
router.put('/users/:userId', userController.updateSingleUser);
router.delete('/users/:userId', userController.deleteSingleUser);

export const userRouter = router;
