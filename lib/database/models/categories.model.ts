import { Schema, model, Document, Types, models } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
