import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    productName: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be a positive number'],  },
    description: { type: String, required: [true, 'Description is required'] },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category ID is required'] }
  },
);

export default model('Product', productSchema);