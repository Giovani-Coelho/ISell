import { controllerRoutes } from "@/infra/http/user/routes/account.routes";
import { Router } from "express";

const routes = Router()

routes.use('/account', controllerRoutes)

export { routes }