import { Router } from 'express';
import { validateBody } from '#middleware';
import { orderSchema, orderInputSchema } from '../schemas/orderSchema.ts';
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from '#controllers';

const orderRoutes = Router();

orderRoutes.route('/').get(getOrders);
orderRoutes.route('/').post(validateBody(orderInputSchema), createOrder);
orderRoutes
  .route('/:id')
  .get(getOrderById)
  .put(validateBody(orderInputSchema), updateOrder)
  .delete(deleteOrder);

export default orderRoutes;