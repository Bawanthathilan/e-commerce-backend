import { Request, Response } from "express";
import { prismaClient } from "..";
import { ProductSchema } from "../schema/product";

export const createProduct = async(req:Request , res:Response)=>{
    ProductSchema.parse(req.body);
    const Product = await prismaClient.product.create({
        data:{
            ...req.body,
            tags: req.body.tags.join(','),
        }
    })

    res.json(Product);
}