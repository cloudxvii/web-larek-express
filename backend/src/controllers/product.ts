import { NextFunction, Request, Response } from 'express';

import Product, { IProduct } from '../models/product';

import { ConflictError } from '../errors/conflictError';
import { BadRequestError } from '../errors/badRequestError';
import { InternalServerError } from '../errors/internalServerError';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then((products: IProduct[]) => res.send({
      items: products,
      total: products.length,
    }))
    .catch((_err: any) => {
      next(new InternalServerError('Error while receiving products'));
    });
};

export const postProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, description, image, category, price,
    } = req.body;

    if (!title || !description || !image || !category) {
      return next(new BadRequestError('Missing product fields'));
    }

    if (!image.fileName || !image.originalName) {
      return next(new BadRequestError('Missing image fields'));
    }

    const newProduct = await Product.create({
      title,
      description,
      image,
      category,
      price,
    });

    return res.status(201).json({
      ...newProduct.toObject(),
      success: true,
      message: 'Product created successfully',
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new ConflictError('A product with this name already exists'));
    }
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Validation error'));
    }
    return next(new InternalServerError());
  }
};
