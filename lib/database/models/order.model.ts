import { Schema, model, Document, Types, models } from "mongoose";

// Interface for Order document
export interface IOrder extends Document {
  client: Types.ObjectId; // Reference to User (client)
  seller: Types.ObjectId; // Reference to Restaurant
  items: {
    menuItem: Types.ObjectId; // Reference to MenuItem
    quantity: number;
    unitPrice: number;
    specialInstructions?: string;
  }[];
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "in-delivery"
    | "delivered"
    | "cancelled";
  totalAmount: number;
  deliveryFee?: number;
  tip?: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    specialInstructions?: string;
  };
  deliveryType?: "delivery" | "pickup" | "dine-in";
  scheduledFor?: Date; // For scheduled delivery/pickup
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  driver?: Types.ObjectId; // Reference to User (driver)
  refundInfo?: {
    amount: number;
    reason: string;
    date: Date;
  };
  promoCodeApplied?: string;
  discountAmount?: number;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
}

// Schema definition
const OrderSchema = new Schema<IOrder>(
  {
    client: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true },
        specialInstructions: { type: String },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "in-delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    deliveryFee: { type: Number },
    tip: { type: Number, default: 0 },

    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    deliveryAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
      specialInstructions: { type: String },
    },
    deliveryType: {
      type: String,
      required: true,
      enum: ["delivery", "pickup", "dine-in"],
      default: "delivery",
    },
    scheduledFor: { type: Date },
    estimatedDeliveryTime: { type: Date },
    actualDeliveryTime: { type: Date },
    driver: { type: Schema.Types.ObjectId, ref: "User" },
    refundInfo: {
      amount: { type: Number },
      reason: { type: String },
      date: { type: Date },
    },
    promoCodeApplied: { type: String },
    discountAmount: { type: Number, default: 0 },
    specialInstructions: { type: String },
    quantity: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = models?.Order || model("Order", OrderSchema);

export default Order;
