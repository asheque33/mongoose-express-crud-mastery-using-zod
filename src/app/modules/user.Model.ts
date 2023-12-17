import { Schema, model } from 'mongoose';
import {
  IUser,
  UserModel,
  userAddress,
  userFullName,
  userOrders,
} from './user.interface';

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
    required: [true, 'Password must be greater than 6 characters'],
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
});

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
