import type { RequestHandler } from 'express';
import { isValidObjectId, type Types } from 'mongoose';
import type { z } from 'zod/v4';
import { Category } from '#models';
import type { newCategorySchema, categorySchema } from '../schemas/categorySchema.ts';

export type CategoryInputDTO = z.input<typeof newCategorySchema>;
export type CategoryDTO = z.infer<typeof categorySchema> & { categoryTag?: string | null };

type IdParams = {
  id: string;
};

export const getCategory: RequestHandler<unknown, CategoryDTO[]> = async (req, res) => {
  const category = await Category.find();
  res.json(category);
};

export const createCategory: RequestHandler<unknown, CategoryDTO, CategoryInputDTO> = async (req, res) => {
  const {
    body: { categoryName }
  } = req;
  const found = await Category.findOne({ categoryName });

  if (found) throw Error('Category already exists', { cause: { status: 400 } });

  const category = await Category.create(req.body satisfies CategoryInputDTO);

  res.status(201).json(category);
};

export const getCategoryById: RequestHandler<IdParams, CategoryDTO> = async (req, res) => {
  const {
    params: { id }
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const category = await Category.findById(id).lean();

  if (!category) throw new Error('Category not found', { cause: { status: 404 } });

  res.json(category);
};

export const updateCategory: RequestHandler<IdParams, CategoryDTO, CategoryInputDTO> = async (req, res) => {
  const {
    params: { id },
    body
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const category = await Category.findByIdAndUpdate(id, body, { new: true }).lean();

  if (!category) throw new Error('Category not found', { cause: { status: 404 } });

  res.json(category);
};

export const deleteCategory: RequestHandler<IdParams, { message: string }> = async (req, res) => {
  const {
    params: { id }
  } = req;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: { status: 400 } });

  const category = await Category.findByIdAndDelete(id);

  if (!category) throw new Error('Category not found', { cause: { status: 404 } });
  res.json({ message: 'Category deleted' });
};

export default {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};