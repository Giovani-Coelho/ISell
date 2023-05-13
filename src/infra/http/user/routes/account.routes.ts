import { Router } from "express";
import { CreateAccountController } from "../controller/CreateAccountController";

const createAccountController = new CreateAccountController();

const accountRoutes = Router();

accountRoutes.post("/create", createAccountController.handle)

export { accountRoutes }