export type userFullName = {
  firstName: string;
  lastName: string;
};
export type userAddress = {
  street: string;
  city: string;
  country: string;
};
export type userOrders = [
  {
    productName: string;
    price: number;
    quantity: number;
  },
];

// main interface
export type normalUser = {
  userId: number;
  username: string;
  password: string;
  fullName: userFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: userAddress;
  orders: userOrders[];
};
