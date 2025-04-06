import { Schema, model, Document, Types, models } from "mongoose";

// Interface for MenuItem document
export interface IMenuItem extends Document {
  name: string;
  seller: Types.ObjectId; // Reference to Restaurant
  description: string;
  price: number;
  category: string;
  image?: string;
  calories?: number;
  ingredients: string[];
  status: "available" | "out_of_stock" | "hidden";
  allergens?: string[];
  dietaryInfo?: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
  };
  isAvailable: boolean;
  isSpicy?: boolean;
  popularity: number;
  isPopular?: boolean;
  preparationTime?: number; // In minutes
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    calories: { type: Number },
    ingredients: [{ type: String }],
    status: {
      type: String,
      enum: ["available", "out_of_stock", "hidden"],
      default: "available",
    },
    allergens: [{ type: String }],
    dietaryInfo: {
      isVegetarian: { type: Boolean, default: false },
      isVegan: { type: Boolean, default: false },
      isGlutenFree: { type: Boolean, default: false },
    },
    isAvailable: { type: Boolean, default: true },
    isSpicy: { type: Boolean, default: false },
    popularity: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    preparationTime: { type: Number }, // In minutes
  },
  { timestamps: true },
);

const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);

export default MenuItem;
