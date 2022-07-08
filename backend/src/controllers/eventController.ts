import { PrismaClient } from "@prisma/client"
import { RequestHandler } from "express";
const prisma = new PrismaClient();


const getEvents: RequestHandler = async (Req, Res) => {
    let events;

    try {

    } catch (e) {

    }


}

const createNewEvent: RequestHandler =async  (Req, Res) => {
    

    try {

    } catch (e) {
        
    }
}

const editEventById: RequestHandler = async (Req, Res) => {

    try {

    } catch (e) {
        
    }
    
}

const deleteEventById: RequestHandler = async (Req, Res) => {
    

    try {

    } catch (e) {
        
    }
}







export {getEvents, createNewEvent, editEventById, deleteEventById}