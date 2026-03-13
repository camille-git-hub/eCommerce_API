import { orderInputSchema } from '#schemas';
import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Product is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be at least 1'] },
  },
  { _id: false }
);

const orderSchema = new Schema(
  { 
    userId: { type: Schema.Types.ObjectId, ref: "User", required: [true, 'User ID is required'] },
    items: { type: orderItemSchema, required: [true, 'Order items are required'] },
    totalPrice: { type: Number, min: [0, 'Total price must be a positive number'] },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
  },
);



export default model('Order', orderSchema);