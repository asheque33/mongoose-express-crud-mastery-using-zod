import { User } from './user.Model';
import { normalUser } from './user.interface';

const createUserIntoDB = async (user: normalUser) => {
  // database query runs on mongoose model namely:User
  const result = await User.create(user);
  return result;
};
const getUsersFromDB = async () => {
  // database query runs on mongoose model namely:User;
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};
const updateSingleUserFromDB = async (userId: number, user: normalUser) => {
  const result = await User.findByIdAndUpdate(userId, user);
  return result;
};
const deleteSingleUserFromDB = async (userId: number) => {
  const result = await User.findByIdAndDelete(userId);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
};
