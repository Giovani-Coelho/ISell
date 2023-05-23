import { orderedProductRoutes } from "@/infra/http/orderedProduct/routes/orderedProduct.routes";
import { productRoutes } from "@/infra/http/product/routes/product.routes";
import { requestRoutes } from "@/infra/http/request/routes/request.routes";
import { accountRoutes } from "@/infra/http/user/routes/account.routes";
import { Router } from "express";

const routes = Router()

routes.use("/account", accountRoutes)
routes.use("/product", productRoutes)
routes.use("/request", requestRoutes)
routes.use("/orderedProduct", orderedProductRoutes)

export { routes }