import type { RequestHandler } from 'express';
import { isValidObjectId, type Types } from 'mongoose';
import type { z } from 'zod/v4';
import { Order, Product } from '#models';
import type { orderInputSchema, orderSchema } from '#schemas';

export type OrderInputDTO = z.input<typeof orderInputSchema>;
export type OrderDTO = z.infer<typeof orderSchema>;

type IdParams = {
  id: string;
};

export const getOrders: RequestHandler<unknown, OrderDTO[]> = async (req, res) => {
  const orders = await Order.find().lean();
  res.json(orders);
};

export const createOrder: RequestHandler<unknown, OrderDTO, OrderInputDTO> = async (req, res) => {
  const {
    body: { userID, items, totalPrice, status }
  } = req;
  const found = await Order.findOne({ userID, items, totalPrice, status });

  if (found) throw Error('Order already exists', { cause: { status: 400 } });
  const order = await Order.create(req.body satisfies OrderInputDTO);

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

export const updateOrder: RequestHandler<IdParams, OrderDTO, OrderInputDTO> = async (req, res) => {
  const {
    params: { id },
    body
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const order = await Order.findByIdAndUpdate(id, body, { new: true }).lean();

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