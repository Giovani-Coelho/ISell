import { Router } from "express";
import { controllerRoutes } from "../../http/user/routes/account.routes";

const routes = Router()

routes.use('/account', controllerRoutes)
routes.use("/", () => console.log("a"))

export { routes }