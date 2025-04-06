import { Schema, model, Document, Types, models } from "mongoose";

// Interface for Seller document
export interface ISeller extends Document {
  name: string;
  owner: Types.ObjectId; // Reference to User (seller)
  description: string;
  cuisine: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  businessHours: {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
  }[];
  images: string[];
  priceRange: "low" | "medium" | "high";
  averageRating: number;
  deliveryOptions: {
    delivery: boolean;
    pickup: boolean;
    dineIn: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Schema definition
const SellerSchema = new Schema<ISeller>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    cuisine: [{ type: String, required: true }],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
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
    images: [{ type: String }],
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
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Seller = models?.Seller || model("Seller", SellerSchema);

export default Seller;
