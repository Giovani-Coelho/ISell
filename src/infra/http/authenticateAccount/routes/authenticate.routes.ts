import { Router } from "express";
import { AuthenticateAccountController } from "../controller/AuthenticateAccountController";

const authenticateAccountController = new AuthenticateAccountController();

const authenticateRoutes = Router();

authenticateRoutes.post("/login", authenticateAccountController.handle);

export { authenticateRoutes }