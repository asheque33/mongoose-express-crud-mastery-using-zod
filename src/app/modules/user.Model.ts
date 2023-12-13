import { Schema, model } from 'mongoose';
import {
  normalUser,
  userAddress,
  userFullName,
  userOrders,
} from './user.interface';

// 2. Create a Schema corresponding to the document interface.
const fullNameSchema = new Schema<userFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<userAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});
const ordersSchema = new Schema<userOrders>([
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
]);

// main schema
const userSchema = new Schema<normalUser>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: fullNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean, required: true },
  hobbies: [String],
  address: addressSchema,
  orders: [ordersSchema],
});

// 3. Create a Model.
export const User = model<normalUser>('User', userSchema);
