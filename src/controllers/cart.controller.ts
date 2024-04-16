import { Request, Response } from 'express';
import { CreateCartSchema , changeQuantitySchema } from '../schema/cart';
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
  //check if user is delete its own cart items
  await prismaClient.cartItems.delete({
    where:{
      id:+req.params.id
    }
  })
  res.json({success:true})
};

export const changeQuantity = async (req: Request, res: Response) => {
  //check if user is delete its own cart items
  const validateData = changeQuantitySchema.parse(req.body);
  const updateCart = prismaClient.cartItems.update({
    where:{
      id:+req.params.id
    },
    data:{
      quantity: validateData.quantity,
    }
  })
  res.json(updateCart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = prismaClient.cartItems.findMany({
    where:{
      userId:req.user.id 
    },
    include:{
      product:true, //include the relations
    }
  })
  res.json(cart);
};
