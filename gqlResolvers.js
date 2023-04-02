import { UserModel } from "./models/user.js";
import { QuoteModel } from "./models/qoute.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const resolvers = {
  Query: {
    users: async () => await UserModel.find({}),
    user: async (_, { _id }) => await UserModel.findById(_id),
    quotes: async () => await QuoteModel.find({}),
  },
//   User: {
//     quotes: (parent) => quotes.filter((quote) => quote.by === parent._id),
//   },
  Mutation: {
    signupUser: async (_, { input }) => {
      const user = await UserModel.findOne({ email: input.email });
      if (user) {
        throw new Error("User already exist with that email");
      }
      const hasedPassword = await bcrypt.hash(input.password, 12);
      const newUser = new UserModel({
        ...input,
        password: hasedPassword,
      });
      return await newUser.save();
    },
    signinUser: async (_, { input }) => {
      const user = await UserModel.findOne({ email: input.email });
      if (!user) {
        throw new Error(`User with ${input.email} not exits`);
      }
      const checkPassword = await bcrypt.compare(input.password, user.password);
      if (!checkPassword) {
        throw new Error("Password do not matched");
      }
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2d",
      });
      return { token };
    },
    deleteUser: async (_, { _id }) => {
      const user = await UserModel.findByIdAndDelete({ _id });
      if (user) {
        throw new Error("User not found");
      }
      return "User deleted Successfully";
    },
    updateUser: async (_, { _id, input }) => {
      const user = await UserModel.findById({ _id });
      if (!user) {
        throw new Error("user not found");
      }
      Object.assign(user, input);
      return await user.save();
    },
    createQuote: async (_, { input }, { _id }) => {
      if (!_id) {
        throw new Error("please login in first");
      }
      const newQoute = await QuoteModel({
        title: input.title,
        by: _id,
      });
      return await newQoute.save();
    },
  },
};

export default resolvers;
