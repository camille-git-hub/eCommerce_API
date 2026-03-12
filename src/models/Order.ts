import { orderInputSchema } from '#schemas';
import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema(
  {
    productID: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'Product is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'], min: [1, 'Quantity must be at least 1'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be a positive number'] } 
  },
  { _id: false }
);

const orderSchema = new Schema(
  { 
    userID: { type: String, required: [true, 'User ID is required'] },
    items: { type: [orderItemSchema], required: [true, 'Order items are required'] },
    totalPrice: { type: Number, required: [true, 'Total price is required'], min: [0, 'Total price must be a positive number'] },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
  },
);



export default model('Order', orderSchema);
export { orderItemSchema };