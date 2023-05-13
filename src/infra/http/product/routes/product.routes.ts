import { Router } from "express";
import { CreateProductController } from "../controller/CreateProductController";


const createProductController = new CreateProductController();

const productRoutes = Router();

productRoutes.post("/create", createProductController.handle);

export { productRoutes }

