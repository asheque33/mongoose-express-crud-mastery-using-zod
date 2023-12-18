// import { Model } from 'mongoose';

import { Model } from 'mongoose';

export type userFullName = {
  firstName: string;
  lastName: string;
};
export type userAddress = {
  street: string;
  city: string;
  country: string;
};
export type userOrders = {
  productName: string;
  price: number;
  quantity: number;
};

// main interface
export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: userFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: userAddress;
  orders?: userOrders[];
  isDeleted?: boolean;
};

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isExistsUserId(userId: number): Promise<IUser | null>;
}
