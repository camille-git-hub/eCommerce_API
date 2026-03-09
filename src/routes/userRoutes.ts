import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '#controllers';
import { validateBody } from '#middleware';
import { userSchema } from '../schemas/userSchema.ts';

const userRoutes = Router();

userRoutes.route('/').get(getUsers);
userRoutes.route('/').post(validateBody(userSchema), createUser);
userRoutes
  .route('/:id')
  .get(getUserById)
  .put(validateBody(userSchema), updateUser)
  .delete(deleteUser);

export default userRoutes;
