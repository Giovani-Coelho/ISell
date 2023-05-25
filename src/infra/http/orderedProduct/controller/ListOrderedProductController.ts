import { ListOrderedProduct } from "@/app/orderedProduct/list/ListOrderedProduct";
import { RequestNotFound } from "@/domain/request/RequestNotFound";
import { OrderedProductRepository } from "@/infra/repositories/orderedProduct/OrderedProductRepository";
import { RequestRepository } from "@/infra/repositories/request/RequestRepository";
import { Request, Response } from "express";
import { ZodError, z } from "zod";

const orderedProductRepository = new OrderedProductRepository();
const requestRepository = new RequestRepository();
const listOrderedProduct = new ListOrderedProduct(orderedProductRepository, requestRepository)

class ListOrderedProductController {
  public async handle(req: Request, res: Response) {
    const reqSchema = z.object({
      request_id: z.string().uuid()
    })

    try {
      const { request_id } = reqSchema.parse(req.query);

      const products = await listOrderedProduct.execute(request_id as string);

      return res.status(200).send({ status: 200, body: { products } })
    } catch (error) {
      if (error instanceof RequestNotFound)
        return res.status(406).json({ status: 400, error: error.message })
      if (error instanceof ZodError)
        return res.status(400).json({ status: 400, error: "Incorrect credentials! Data must be (string & uuid)" })

      return res.status(400).json({ status: 400, error: "Internal Server Error." })
    }
  }
}

export { ListOrderedProductController }