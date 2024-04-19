import { Request, Response } from 'express';
import { CreateCartSchema, ChangeQuantitySchema } from '../schema/cart';
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

export const deleteItemFromcart = async (req: Request, res: Response) => {
  // Check if user is deleting its own cart item
  await prismaClient.cartItems.delete({
    where: {
      id: +req.params.id
    }
  });
  res.json({ success: true });
};

export const changeQuantity = async (req: Request, res: Response) => {
  // Check if user is updating its own cart item
  const validatedData = ChangeQuantitySchema.parse(req.body);
  const updatedCart = await prismaClient.cartItems.update({
    where: {
      id: +req.params.id
    },
    data: {
      quantity: validatedData.quantity
    }
  });

  res.json(updatedCart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItems.findMany({
    where: {
      userId: req.user.id
    },
    include: {
      product: true
    }
  });
  res.json(cart);
};
