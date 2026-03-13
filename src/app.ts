import express from 'express';
import '../src/db/index.ts';
import { userRoutes, productRoutes, categoryRoutes, orderRoutes } from './routes/index.ts';
import { errorHandler, notFoundHandler } from '#middleware';
import {validateBody} from '#middleware';
import { orderInputSchema, productSchema, categorySchema } from '#schemas';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', validateBody(productSchema), productRoutes);
app.use('/categories', validateBody(categorySchema), categoryRoutes);
app.use('/orders', validateBody(orderInputSchema), orderRoutes);
app.use('*splat', notFoundHandler);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));