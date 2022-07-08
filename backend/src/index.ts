import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { eventRouter } from './routes/eventRouter';
import { itemRouter } from './routes/itemRouter';

const app = express();
const prisma = new PrismaClient();


dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use('/event', eventRouter);
app.use('/item', itemRouter);


app.listen(process.env.PORT, () => {console.log(`listening on port ${process.env.PORT}`)});
