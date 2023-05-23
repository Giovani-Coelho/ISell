import { Router } from "express";
import { CreateOrderedProductController } from "../controller/CreateOrderedProductController";

const orderedProductRoutes = Router();

const createOrderedProductController = new CreateOrderedProductController();

orderedProductRoutes.post("/create", createOrderedProductController.handle);

export { orderedProductRoutes }