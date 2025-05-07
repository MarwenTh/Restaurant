import { Schema, model, Document, Types, models } from "mongoose";

export interface IPromo extends Document {
  _id: Types.ObjectId;
  code: string;
  discount: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const promoSchema = new Schema<IPromo>({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Promo = models.Promo || model<IPromo>("Promo", promoSchema);

export default Promo;
