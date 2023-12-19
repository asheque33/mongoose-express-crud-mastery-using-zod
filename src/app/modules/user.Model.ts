import { Document, Query, Schema, model } from 'mongoose';
import {
  IUser,
  UserModel,
  userAddress,
  userFullName,
  userOrders,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

// 2. Create a Schema corresponding to the document interface.
const fullNameSchema = new Schema<userFullName>({
  firstName: { type: String, required: [true, 'First Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});
const addressSchema = new Schema<userAddress>({
  street: { type: String, required: [true, 'Street Address is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});
const ordersSchema = new Schema<userOrders>({
  productName: { type: String, required: [true, 'Product Name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

// main schema
const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User id must be unique'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'UserName must be unique'],
  },
  password: {
    type: String,
    required: [
      true,
      'Password must be greater than 6 characters & less than 20 characters',
    ],
  },
  fullName: fullNameSchema,
  age: { type: Number, required: [true, 'Age is required'] },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email must be inserted'],
    lowercase: true,
  },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: addressSchema,
  orders: [ordersSchema],
  isDeleted: { type: Boolean, default: false },
});
// pre middleware hook will work on create() / save()
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// after creating json object ,we should not send 'password' to the response body & other unnecessary properties.
userSchema.set('toJSON', {
  transform: function (updatedDoc, user) {
    delete user.password;
    delete user.isDeleted;
    delete user._id;
    delete user.orders;
    delete user.__v;
    delete user.fullName._id;
    delete user.address._id;
    return user;
  },
});
//-----pre hook for Query middleware-----
// query for 'getAllUsers'
userSchema.pre('find', function (this: Query<IUser, Document>, next) {
  this.find({ isDeleted: { $ne: true } });
  this.projection({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  next();
});
// query for 'getSingleUser'
userSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  this.projection({
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    hobbies: 1,
    isActive: 1,
    _id: 0,
  });
  next();
});

// // query for 'orders' From single user
// userSchema.pre('findOne', async function (this: Query<IUser, Document>, next) {
//   this.find({ $isDeleted: { $ne: true } });
//   this.projection({
//     orders: 1,
//     _id: 0,
//   });
//   next();
// });

// static method
userSchema.statics.isExistsUserId = async function (userId: number) {
  try {
    const lastUser = await User.findOne({ userId }).exec();
    if (!lastUser) {
      return 'User not found';
    } else {
      return lastUser;
    }
  } catch (error) {
    throw new Error('User not found');
  }
};

// 3. Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
