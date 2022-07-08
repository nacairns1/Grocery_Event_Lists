import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
const prisma = new PrismaClient();

const getEvents: RequestHandler = async (req, res) => {
	let events;

	try {
		events = await prisma.event.findMany({include:{items: true}});
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error finding events"});
	}

	return res.status(200).send({ events });
};

const createNewEvent: RequestHandler = async (req, res) => {
	let { name, active } = req.body;

	let newEvent;

	try {
		newEvent = await prisma.event.create({ data: { name, active } });
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error creating event" });
	}

	return res.status(201).send({ event: newEvent });
};

interface EventRequest {
	name?: string;
	active?: boolean;
}

const editEventById: RequestHandler = async (req, res) => {
	let eventId = parseInt(req.params.eventId);
	let { name, active } = req.body;

	let eventRequest: EventRequest = {};
	if (name !== undefined) {
		eventRequest.name = name;
	}
	if (active !== undefined) {
		eventRequest.active = active;
	}

	let editedEvent;

	try {
		editedEvent = await prisma.event.update({
			where: { id: eventId },
			data: eventRequest,
		});
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error editing event" });
	}

	return res.status(201).send({ event: editedEvent });
};

const deleteEventById: RequestHandler = async (req, res) => {
	let eventId = parseInt(req.params.eventId);

	let deletedEvent;
	try {
		deletedEvent = await prisma.event.delete({ where: { id: eventId } });
	} catch (e) {
		console.error(e);
		return res.status(400).send({ message: "Error deleting event" });
	}

	return res.status(200).send({ event: deletedEvent });
};

export { getEvents, createNewEvent, editEventById, deleteEventById };
