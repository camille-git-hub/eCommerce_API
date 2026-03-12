import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: [true, 'Category name is required'] },
    categoryTag: { type: String }
  },
);

export default model('Category', categorySchema);

