import { Router } from "express";
import { CreateRequestController } from "../controller/CreateRequestController";
import { ListRequestController } from "../controller/ListRequestController";

const createRequestController = new CreateRequestController();
const listRequestController = new ListRequestController();

const requestRoutes = Router();

requestRoutes.post("/create", createRequestController.handle);
requestRoutes.get("/list", listRequestController.handle);

export { requestRoutes }