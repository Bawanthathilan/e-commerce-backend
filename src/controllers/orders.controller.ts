import { Request, Response } from 'express';
import { prismaClient } from '..';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

export const createOrder = async (req: Request, res: Response) => {
  //1.create a transaction
  //2.to list the all the cart items and proceed if cart is not  empty
  //3.calculate the price the total amount
  //4, fetch address aof user
  //5 to define computed field for formatted address on address module
  //6. we will create a order product order products
  //7. create event
  //8. empty the cart

  return await prismaClient.$transaction(async (tx) => {
    const cartItems = await tx.cartItems.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        product: true
      }
    });
    if (cartItems.length === 0) {
      return res.json({ message: 'cart is empty' });
    }

    const price = cartItems.reduce((prev, current) => {
      return prev + current.quantity * +current.product.price;
    }, 0);

    const address = await tx.address.findFirst({
      where: {
        id: req.user.defaultShippingAddress
      }
    });

    const order = await tx.order.create({
      data: {
        userId: req.user.id,
        netAmount: price,
        address: address.formattedAdddress,
        products: {
          create: cartItems.map((cart) => {
            return {
              productId: cart.productId,
              quantity: cart.quantity
            };
          })
        }
      }
    });

    await tx.orderEvent.create({
      data: {
        orderId: order.id
      }
    });

    await tx.cartItems.deleteMany({
      where: {
        userId: req.user.id
      }
    });

    return res.json(order);
  });
};

export const listOrders = async (req: Request, res: Response) => {
  const orders = await prismaClient.order.findMany({
    where: {
      userId: req.user.id
    }
  });
  return res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx)=>{
    try {
      const order = await tx.order.update({
        where: {
          id: +req.params.id
        },
        data: {
          status: 'CANCELED'
        }
      });
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          status: 'CANCELED'
        }
      });
      res.json(order);
    } catch (error) {
      throw new NotFoundException('Order Not Found', ErrorCode.ADDRESS_NOT_FOUND);
    }
  })

};

export const getOrderbyId = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: {
        id: +req.params.id
      },
      include: {
        products: true,
        events: true
      }
    });

    res.json(order);
  } catch (error) {
    throw new NotFoundException('Order Not Found', ErrorCode.ADDRESS_NOT_FOUND);
  }
};

export const listAllOrders = async (req: Request, res: Response) => {
  let whereClause = {};

  const status = req.query.status;

  if (status) {
    whereClause = {
      status
    };
  }

  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: +req.query.skip || 0,
    take: 5
  });

  res.json(orders);
};

export const changeStatus = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx)=>{
    try {
      const order = await tx.order.update({
        where: {
          id: +req.params.id
        },
        data: {
          status: req.body.status
        }
      });
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          status: req.body.status
        }
      });
      res.json(order);
    } catch (error) {
      throw new NotFoundException('Order not found', ErrorCode.ADDRESS_NOT_FOUND);
    }
  })
 
};

export const listUserOrders = async (req: Request, res: Response) => {
  let whereClause: any = {
    userId: +req.params.id
  };

  const status = req.params.status;

  if (status) {
    whereClause = {
      ...whereClause,
      status
    };
  }

  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: +req.query.skip || 0,
    take: 5
  });

  res.json(orders);
};
