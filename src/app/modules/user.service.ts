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
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateSingleUserFromDB = async (id: string, user: normalUser) => {
  const result = await User.findByIdAndUpdate(id, user);
  return result;
};
const deleteSingleUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
};
