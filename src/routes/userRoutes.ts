import { Router } from 'express';
import { validateBody } from '#middleware';
import { newUserSchema, userSchema } from '../schemas/userSchema.ts';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '#controllers';

const userRoutes = Router();

userRoutes.route('/').get(getUsers);
userRoutes.route('/').post(validateBody(newUserSchema), createUser);
userRoutes
  .route('/:id')
  .get(getUserById)
  .put(validateBody(newUserSchema), updateUser)
  .delete(deleteUser);

export default userRoutes;
