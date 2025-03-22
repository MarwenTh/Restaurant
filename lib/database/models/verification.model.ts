import { Schema, model, models } from "mongoose";

const VerificationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 900,
    },
  },
  { timestamps: true },
);

const Verification =
  models?.Verification || model("Verification", VerificationSchema);

export default Verification;
