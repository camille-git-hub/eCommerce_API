import { Router } from 'express';
import { validateBody } from '#middleware';
import { newCategorySchema, categorySchema } from '../schemas/categorySchema.ts';
import { getCategory, createCategory, deleteCategory, updateCategory, getCategoryById } from '#controllers';
const categoryRoutes = Router();

categoryRoutes.route('/').get(getCategory);
categoryRoutes.route('/').post(validateBody(newCategorySchema), createCategory);
categoryRoutes
  .route('/:id')
  .get(getCategoryById)
  .put(validateBody(newCategorySchema), updateCategory)
  .delete(deleteCategory);

export default categoryRoutes;