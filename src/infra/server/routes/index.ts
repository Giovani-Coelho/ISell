import { authenticateRoutes } from "@/infra/http/authenticateAccount/routes/authenticate.routes";
import { orderedProductRoutes } from "@/infra/http/orderedProduct/routes/orderedProduct.routes";
import { productRoutes } from "@/infra/http/product/routes/product.routes";
import { requestRoutes } from "@/infra/http/request/routes/request.routes";
import { accountRoutes } from "@/infra/http/user/routes/account.routes";
import { ensureAuthenticate } from "@/infra/middleware/ensureAuthenticate";
import { Router } from "express";

const routes = Router()

routes.use("/account", accountRoutes)
routes.use(authenticateRoutes)

routes.use(ensureAuthenticate);

routes.use("/product", productRoutes)
routes.use("/request", requestRoutes)
routes.use("/orderedProduct", orderedProductRoutes)

export { routes }