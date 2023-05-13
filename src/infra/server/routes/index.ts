import { productRoutes } from "@/infra/http/product/routes/product.routes";
import { accountRoutes } from "@/infra/http/user/routes/account.routes";
import { Router } from "express";

const routes = Router()

routes.use("/account", accountRoutes)
routes.use("/product", productRoutes)

export { routes }