import { Router } from "express";
import { AccountController } from "../controller/AccountController";


const controllerRoutes = Router();
const accountController = new AccountController();
controllerRoutes.post("/create", accountController.create)

export { controllerRoutes }