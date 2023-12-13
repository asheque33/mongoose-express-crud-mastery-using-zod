import { Request, Response } from 'express';
import { userServices } from './user.service';

//NB: UserController call only req and res ;

//To create a new user data
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUserIntoDB(userData);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// To get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All Users fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// To get single user data
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const singleUser = req.params.id;
    const result = await userServices.getSingleUserFromDB(singleUser);
    res.status(200).json({
      success: true,
      message: 'Single user fetched successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// To update single user data
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const result = await userServices.updateSingleUserFromDB(userId, userData);
    res.status(200).json({
      success: true,
      message: 'Single user updated successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
// To delete single user data
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userServices.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Single user deleted successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
