import type { RequestHandler } from 'express';
import { isValidObjectId, type Types } from 'mongoose';
import type { z } from 'zod/v4';
import { Category, Product } from '#models';
import type { newProductSchema, productSchema } from '#schemas/productSchema';

export type ProductInputDTO = z.input<typeof newProductSchema>;
export type ProductDTO = z.infer<typeof productSchema>;

type IdParams = {
  id: string;
};

export const getProducts: RequestHandler<unknown, ProductDTO[]> = async (req, res) => {
  const products = await Product.find().lean();
  res.json(products);
};

export const createProduct: RequestHandler<unknown, ProductInputDTO> = async (req, res) => {
  const {
    body: { productName }
  } = req;
  const found = await Product.findOne({ productName });

  if (found) throw Error('Product already exists', { cause: { status: 400 } });

  const categoryExists = await Category.exists({ _id: req.body.categoryId });
  if (!categoryExists) throw Error('Category not found', { cause: { status: 404 } });

  const product = await Product.create(req.body satisfies ProductInputDTO);

  res.status(201).json(product);
};

export const getProductById: RequestHandler<IdParams, ProductDTO> = async (req, res) => {
  const {
    params: { id }
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const product = await Product.findById(id).lean();

  if (!product) throw new Error('Product not found', { cause: { status: 404 } });

  res.json(product);
};

export const updateProduct: RequestHandler<IdParams, ProductDTO, ProductInputDTO> = async (req, res) => {
  const {
    params: { id },
    body
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const categoryExists = await Category.exists({ _id: req.body.categoryId });
  if (!categoryExists) throw Error('Category not found', { cause: { status: 404 } });

  const product = await Product.findByIdAndUpdate(id, body, { new: true }).lean();

  if (!product) throw new Error('Product not found', { cause: { status: 404 } });

  res.json(product);
};

export const deleteProduct: RequestHandler<IdParams, { message: string }> = async (req, res) => {
  const {
    params: { id }
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const product = await Product.findByIdAndDelete(id);

  if (!product) throw new Error('Product not found', { cause: { status: 404 } });
  res.json({ message: 'Product deleted' });
};

export default {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};