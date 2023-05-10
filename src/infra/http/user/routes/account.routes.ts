import { Router } from "express";
import { CreateAccountController } from "../controller/CreateAccountController";


const controllerRoutes = Router();
const createAccountController = new CreateAccountController();
controllerRoutes.post("/create", createAccountController.handle)

export { controllerRoutes }