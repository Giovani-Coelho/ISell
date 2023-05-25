import { Router } from "express";
import { CreateOrderedProductController } from "../controller/CreateOrderedProductController";
import { ListOrderedProductController } from "../controller/ListOrderedProductController";

const orderedProductRoutes = Router();

const createOrderedProductController = new CreateOrderedProductController();
const listOrderedProductController = new ListOrderedProductController();

orderedProductRoutes.post("/create", createOrderedProductController.handle);
orderedProductRoutes.get("/list", listOrderedProductController.handle);

export { orderedProductRoutes }