import type { RequestHandler } from 'express';
import { isValidObjectId, type Types } from 'mongoose';
import type { z } from 'zod/v4';
import { Order, orderItemSchema, Product, User } from '#models';
import type { orderInputSchema, orderSchema } from '#schemas';

export type OrderInputDTO = z.input<typeof orderInputSchema>;
export type OrderDTO = z.infer<typeof orderSchema>;

type IdParams = {
  id: string;
};

export const getOrders: RequestHandler<unknown, OrderDTO> = async (req, res) => {
  const orders = await Order.find().lean();
  res.json(orders);
};

export const createOrder: RequestHandler<unknown, OrderDTO, OrderInputDTO> = async (req, res) => {
  const {
    body: { userId, items, status }
  } = req;

  const productId = await Product.findOne({ _id: items[0]!.productId }).lean();
  if (!productId) throw Error('Product not found', { cause: { status: 404 } });

  const userIdExists = await User.exists({ _id: userId });
  if (!userIdExists) throw Error('User not found', { cause: { status: 404 } });

  const totalPrice = items.reduce((total, item) => total + item.quantity * productId.price, 0);

    const order = await Order.create({ userId, items, totalPrice, status });

  res.status(201).json(order);
};

export const getOrderById: RequestHandler<IdParams, OrderDTO> = async (req, res) => {
  const {
    params: { id }
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const order = await Order.findById(id).lean();

  if (!order) throw new Error('Order not found', { cause: { status: 404 } });
  res.json(order);
};

export const updateOrder: RequestHandler<IdParams, OrderDTO> = async (req, res) => {
  const {
    params: { id },
    body: { userId, items }
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const productId = await Product.findOne({ _id: items[0].productId }).lean();
  if (!productId) throw Error('Product not found', { cause: { status: 404 } });

  const userIdExists = await Order.exists({ userId });
  if (!userIdExists) throw Error('User not found', { cause: { status: 404 } });

  const order = await Order.findByIdAndUpdate(id, { new: true }).lean();

  if (!order) throw new Error('Order not found', { cause: { status: 404 } });

  res.json(order);
};

export const deleteOrder: RequestHandler<IdParams, { message: string }> = async (req, res) => {
  const {
    params: { id }
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const order = await Order.findByIdAndDelete(id);

  if (!order) throw new Error('Order not found', { cause: { status: 404 } });
  res.json({ message: 'Order deleted' });
};

export default {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder
};