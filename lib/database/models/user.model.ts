import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["Client", "Restaurant", "Delivery", "Admin", "Vendor"],
    },
    image: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = models?.User || model("User", UserSchema);

export default User;
