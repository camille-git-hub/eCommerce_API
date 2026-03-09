import { Router } from 'express';
import { validateBody } from '#middleware';
import { newProductSchema, productSchema } from '../schemas/productSchema.ts';
import { getProducts, createProduct, deleteProduct, updateProduct, getProductById } from '#controllers';

const productRoutes = Router();

productRoutes.route('/').get(getProducts);
productRoutes.route('/').post(validateBody(newProductSchema), createProduct);
productRoutes
  .route('/:id')
  .get(getProductById)
  .put(validateBody(newProductSchema), updateProduct)
  .delete(deleteProduct);

export default productRoutes;