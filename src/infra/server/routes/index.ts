import { Router } from "express";
import { controllerRoutes } from "../../http/user/routes/account.routes";

const routes = Router()

routes.use('/account', controllerRoutes)

export { routes }