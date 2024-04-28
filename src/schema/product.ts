import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string(),
  image: z.any(),
  description: z.string(),
  price: z.any(),
  tags: z.any()
});
