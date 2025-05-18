import { Schema, model, Document, Types, models } from "mongoose";

interface ISiteReview extends Document {
  name: string;
  role: string;
  reviewMessage: string;
  image: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const siteReviewSchema = new Schema<ISiteReview>({
  name: { type: String, default: "Guest" },
  role: { type: String, default: "User" },
  reviewMessage: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.SiteReview ||
  model<ISiteReview>("SiteReview", siteReviewSchema);
