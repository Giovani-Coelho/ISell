import { Router } from "express";
import { CreateProductController } from "../controller/CreateProductController";
import { ListProductController } from "../controller/ListProductController";


const createProductController = new CreateProductController();
const listProductController = new ListProductController();

const productRoutes = Router();

productRoutes.post("/create", createProductController.handle);
productRoutes.get("/list/:account_id", listProductController.handle);


export { productRoutes }

