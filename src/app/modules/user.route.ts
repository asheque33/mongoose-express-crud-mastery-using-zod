import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

// userRouter will call the userController
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.delete('/:userId', userController.deleteSingleUser);

export const userRouter = router;
