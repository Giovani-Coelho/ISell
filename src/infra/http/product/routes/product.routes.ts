import { Router } from "express";
import { CreateProductController } from "../controller/CreateProductController";
import { ListProductController } from "../controller/ListProductController";
import { ListAllProductController } from "../controller/ListAllProductController";
import { DeleteProductController } from "../controller/DeleteProductController";

const createProductController = new CreateProductController();
const listProductController = new ListProductController();
const listAllProductController = new ListAllProductController();
const deleteProductController = new DeleteProductController();

const productRoutes = Router();

productRoutes.post("/create", createProductController.handle);
productRoutes.get("/list/accountProducts/:account_id", listProductController.handle);
productRoutes.get("/list/:page", listAllProductController.handle);
productRoutes.delete("/delete/:account_id", deleteProductController.handle);

export { productRoutes }

