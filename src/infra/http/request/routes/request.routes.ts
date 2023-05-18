import { Router } from "express";
import { CreateRequestController } from "../controller/CreateRequestController";

const createRequestController = new CreateRequestController();

const requestRoutes = Router();

requestRoutes.post("/create", createRequestController.handle);

export { requestRoutes }