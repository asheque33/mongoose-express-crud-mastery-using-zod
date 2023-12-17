import { User } from './user.Model';
import { IUser } from './user.interface';

const createUserIntoDB = async (user: IUser) => {
  // // database query runs on mongoose model namely:User
  const result = await User.create(user);
  return result;
};
const getUsersFromDB = async () => {
  // database query runs on mongoose model namely:User;
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (userId: number) => {
  const b = await User.isExistsUserId(userId);
  if (!b) {
    return 'User not found';
  }

  const result = await User.findOne({ userId });
  return result;
};
const updateSingleUserFromDB = async (userId: number, user: IUser) => {
  const b = await User.isExistsUserId(userId);
  if (!b) {
    return 'User not found';
  }
  const result = await User.findOneAndReplace({ userId }, user);
  return result;
};
const deleteSingleUserFromDB = async (userId: number) => {
  const b = await User.isExistsUserId(userId);
  if (!b) {
    return 'User not found';
  }
  const result = await User.findOneAndDelete({ userId });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
};
