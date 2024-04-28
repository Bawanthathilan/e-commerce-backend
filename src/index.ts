import express from 'express';
import cors from 'cors'; 
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors.middleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({
  log: ['query']
}).$extends({
  result: {
    address: {
      formattedAdddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true
        },
        compute: (address) => {
          return `${address.lineOne}. ${address.lineTwo}. ${address.city}. ${address.country} - ${address.pincode}`;
        }
      }
    }
  }
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('app working');
});
