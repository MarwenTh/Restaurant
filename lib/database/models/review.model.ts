import { Schema, model, Document, Types, models } from "mongoose";

// Interface for Review document
export interface IReview extends Document {
  Seller: Types.ObjectId; // Reference to Restaurant
  client: Types.ObjectId; // Reference to User (client)
  rating: number;
  comment: string;
  images?: string[];
  orderRef?: Types.ObjectId; // Optional reference to Order
  status: "published" | "flagged" | "rejected";
  response?: {
    responder: Types.ObjectId; // Reference to User (seller or admin)
    text: string;
    date: Date;
  };
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const ReviewSchema = new Schema<IReview>(
  {
    Seller: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { type: String, required: true },
    images: [{ type: String }],
    orderRef: { type: Schema.Types.ObjectId, ref: "Order" },
    status: {
      type: String,
      required: true,
      enum: ["published", "flagged", "rejected"],
      default: "published",
    },
    response: {
      responder: { type: Schema.Types.ObjectId, ref: "User" },
      text: { type: String },
      date: { type: Date },
    },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Review = models?.Review || model("Review", ReviewSchema);

export default Review;
