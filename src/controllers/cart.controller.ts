import { Request, Response } from 'express';
import { CreateCartSchema } from '../schema/cart';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { Product } from '@prisma/client';
import { prismaClient } from '..';

export const addItemTocart = async (req: Request, res: Response) => {
  const validatedData = CreateCartSchema.parse(req.body);
  let Product: Product;

  try {
    Product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId
      }
    });
    const cart = await prismaClient.cartItems.create({
      data: {
        userId: req.user.id,
        productId: Product.id,
        quantity: validatedData.quantity
      }
    });

    res.json(cart);
  } catch (error) {
    throw new NotFoundException(
      'Product not found',
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const deleteItemFromcart = async (req: Request, res: Response) => {};

export const changeQuantity = async (req: Request, res: Response) => {};

export const getCart = async (req: Request, res: Response) => {};
