import { PrismaClient } from "@prisma/client"
import { RequestHandler } from "express";
const prisma = new PrismaClient();


const getItems: RequestHandler = async (req, res) => {


	let items;

	try {
		items = await prisma.item.findMany();
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error finding items" });
	}

	return res.status(200).send({ items });
}

const createNewItem: RequestHandler = async (req, res) => {

	let { name, purchased, eventId } = req.body;

	let newItem;

	try {
		newItem = await prisma.item.create({ data: { name, purchased, eventId } });
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error creating item" });
	}
	return res.status(201).send({ item: newItem });
}

interface ItemRequest {
	name?: string;
	purchased?: boolean;
}


const editItemById: RequestHandler = async (req, res) => {

	let itemId = parseInt(req.params.itemId);
	let { name, purchased } = req.body;

	let itemRequest: ItemRequest = {};
	if (name !== undefined) {
		itemRequest.name = name;
	}
	if (purchased !== undefined) {
		itemRequest.purchased = purchased;
	}

	let editedItem;

	try {
		editedItem = await prisma.item.update({
			where: { id: itemId },
			data: itemRequest,
		});
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error editing item" });
	}

	return res.status(201).send({ item: editedItem });

    
}

const deleteItemById: RequestHandler = async (req, res) => {
    
	let itemId = parseInt(req.params.itemId);

	let deletedItem;
	try {
		deletedItem = await prisma.item.delete({ where: { id: itemId } });
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error deleting item" });
	}

	return res.status(200).send({ item: deletedItem });
}

export {getItems, createNewItem, editItemById, deleteItemById}