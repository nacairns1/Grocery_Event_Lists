import { Router } from "express";

const eventRouter = Router();

import {getEvents, createNewEvent, editEventById, deleteEventById} from "../controllers/eventController"


eventRouter.get('/', getEvents);
eventRouter.post('/', createNewEvent);
eventRouter.patch('/:eventId', editEventById);
eventRouter.delete('/:eventId', deleteEventById);

export {eventRouter};