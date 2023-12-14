/* eslint-disable @typescript-eslint/no-explicit-any */
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: error.message || 'User creation failed',
    });
  }
};
// To get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Users fetched failed',
    });
  }
};
// To get single user data
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const singleUser = req.params.userId;
    const individualId = parseInt(singleUser);
    const result = await userServices.getSingleUserFromDB(individualId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: error.message || 'User fetched failed',
    });
  }
};
// To update single user data
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const individualId = parseInt(id);
    const { user: userData } = req.body;
    console.log(individualId, userData);
    const result = await userServices.updateSingleUserFromDB(
      individualId,
      userData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: error.message || 'User update failed',
    });
  }
};
// To delete single user data
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const individualId = parseInt(id);
    await userServices.deleteSingleUserFromDB(individualId);
    console.log('Deleted User Id is :', individualId);
    res.status(200).json({
      success: true,
      message: 'Single user deleted successfully',
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong deleting the user',
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
