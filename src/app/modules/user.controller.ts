/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

//NB: UserController call only req and res ;

//To create a new user data
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // userSchema validation using zod
    const zodParsedData = userValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodParsedData);
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
      error: error,
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
      error: error,
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
      error: error,
    });
  }
};
// To update single user data
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const individualId = parseInt(id);
    const userData = req.body;
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
      error: error,
    });
  }
};
// To delete single user data
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const individualId = parseInt(id);
    const result = await userServices.deleteSingleUserFromDB(individualId);
    console.log('Deleted User Id is :', individualId);
    res.status(200).json({
      success: true,
      message: 'Single user deleted successfully',
      data: null || result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: error.message || 'Something went wrong deleting the user',
      error: error,
    });
  }
};
// To update orders of a user
const updateUserOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const individualId = parseInt(id);
    const userOrders = req.body;
    console.log(individualId, userOrders);
    await userServices.updateSingleUserFromDB(individualId, userOrders);
    res.status(200).json({
      success: true,
      message: 'Orders created successfully',
      data: null,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'failed',
      message: error.message || 'User not found',
      error: error,
    });
  }
};
// To get all orders from a single user
// const getOrdersFromSingleUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.userId;
//     const individualId = parseInt(id);
//     console.log(individualId);
//     const result = await userServices.getSingleAllOrdersFromDB(individualId);
//     res.status(200).json({
//       success: true,
//       message: 'Orders fetched successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       status: 'failed',
//       message: error.message || 'User not found',
//       error: error,
//     });
//   }
// };

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  updateUserOrders,
  // getOrdersFromSingleUser,
};
