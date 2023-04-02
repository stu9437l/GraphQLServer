import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  quote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
    },
  ],
});

export const UserModel = mongoose.model("User", UserSchema);
