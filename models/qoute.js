import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const QuoteModel = mongoose.model("Quote", QuoteSchema);
