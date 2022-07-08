import { Router } from "express";

const itemRouter = Router();

import {getItems, createNewItem, editItemById, deleteItemById} from "../controllers/itemController"


itemRouter.get('/', getItems);
itemRouter.post('/', createNewItem);
itemRouter.patch('/:itemId', editItemById);
itemRouter.delete('/:itemId', deleteItemById);

export {itemRouter};