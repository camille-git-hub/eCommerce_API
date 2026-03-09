import express from 'express';
import '../src/db/index.ts';
import { userRoutes } from './routes/index.ts';
import { errorHandler, notFoundHandler } from '#middleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.use('*splat', notFoundHandler);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));