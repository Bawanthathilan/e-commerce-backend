import { Request, Response } from 'express';
import { prismaClient } from '..';
import { ProductSchema } from '../schema/product';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { cloudinary } from '../utils/cloudinary';


export const createProduct = async (req: Request, res: Response) => {
  ProductSchema.parse(req.body);
  try {
    if (!req.file.path) {
      return res.status(400).json({ error: 'Image file is required' });
    }
  
    const result = await cloudinary.uploader.upload(req.file.path)
    
    if(result.secure_url){
      let tags = '';
      if (Array.isArray(req.body.tags)) {
        tags = req.body.tags.join(','); // Join tags if it's an array
      } else {
        tags = req.body.tags; // Otherwise, use tags as is
      }
      const Product = await prismaClient.product.create({
        data: {
          ...req.body,
          image: result.secure_url,
          tags: tags,
        },
      });
      res.json(Product);
    }else{
      console.log("errr")
    }
  } catch (error) {
    console.log(error);
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }

  

  
  
  
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(',');
    }
    const updatedProduct = await prismaClient.product.update({
      where: {
        id: +req.params.id
      },
      data: product
    });
    res.json(updatedProduct);
  } catch (error) {
    throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
     await prismaClient.product.delete({
      where: {
        id: +req.params.id
      }
    });
    res.json({ success: true });
};

export const listProducts = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: +req.query.skip || 0,
    take: 10
  });
  res.json({ count, data: products });
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: +req.params.id
      }
    });
    res.json(product);
  } catch (error) {
    throw new NotFoundException('Products not found', ErrorCode.PRODUCT_NOT_FOUND);
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const products = await prismaClient.product.findMany({
    skip: +req.query.skip || 0,
    take: 5,
    where: {
      name: {
        search: req.query.q.toString()
      },
      description: {
        search: req.query.q.toString()
      },
      tags: {
        search: req.query.q.toString()
      }
    }
  });

  res.json(products);
};
