import { User } from './user.Model';
import { IUser, userOrders } from './user.interface';

const createUserIntoDB = async (user: IUser) => {
  // // database query runs on mongoose model namely:User
  const result = await User.create(user);
  return result;
};
const getUsersFromDB = async () => {
  // database query runs on mongoose model namely:User;
  const result = await User.find();
  console.log(result);
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
  const result = await User.findOneAndUpdate({ userId }, user, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSingleUserFromDB = async (userId: number) => {
  const b = await User.isExistsUserId(userId);
  if (!b) {
    return 'User not found';
  }
  const result = await User.updateOne({ userId }, { isDeleted: true });
  return result;
};
// update orders of a user from the database
const updateUserOrdersFromDB = async (userId: number, orders: userOrders) => {
  const b = await User.isExistsUserId(userId);
  if (!b) {
    return 'User not found';
  }
  const result = await User.findOneAndUpdate({ userId }, orders, {
    new: true,
    runValidators: true,
  });
  return result;
};
// all orders of a single user from the database
const getSingleAllOrdersFromDB = async (userId: number) => {
  const b = await User.isExistsUserId(userId);
  if (!b) {
    return 'User not found';
  }

  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $project: { orders: 1, _id: 0 } },
  ]);
  return result;
};
const getTotalPriceOrdersFromDB = async (userId: number, user: IUser) => {
  const b = await User.isExistsUserId(userId);
  if (!b) {
    return 'User not found';
  }

  const result = await User.findOne({ userId }, user, {
    new: true,
    runValidators: true,
  });
  return 'total price orders: ' + result;
};

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  updateUserOrdersFromDB,
  getSingleAllOrdersFromDB,
  getTotalPriceOrdersFromDB,
};
