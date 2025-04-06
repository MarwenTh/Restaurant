import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string; // This would be hashed in a real application
  name: string;
  verified: boolean;
  role: "Admin" | "Client" | "Seller" | "Delivery";
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  //
  description?: string;
  cuisine?: string[];
  location?: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  contactInfo?: {
    phone: string;
    email: string;
    website?: string;
  };
  businessHours?: {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
  }[];
  thumbnail?: string;
  priceRange?: "low" | "medium" | "high";
  averageRating?: number;
  deliveryOptions?: {
    delivery: boolean;
    pickup: boolean;
    dineIn: boolean;
  };
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Client", "Seller", "Delivery"],
      default: "Client",
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
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
    //
    description: { type: String },
    cuisine: [{ type: String }],
    contactInfo: {
      phone: { type: String },
      email: { type: String },
      website: { type: String },
    },
    businessHours: [
      {
        day: { type: String, required: true },
        open: { type: String, required: true },
        close: { type: String, required: true },
        isClosed: { type: Boolean, default: false },
      },
    ],
    thumbnail: { type: String },
    priceRange: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    averageRating: { type: Number, default: 0 },
    deliveryOptions: {
      delivery: { type: Boolean, default: true },
      pickup: { type: Boolean, default: true },
      dineIn: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

const User = models?.User || model("User", UserSchema);

export default User;
