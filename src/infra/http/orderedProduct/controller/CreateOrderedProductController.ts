import { CreateOrderedProduct } from '@/app/orderedProduct/create/CreateOrderedProduct';
import { ProductNotFound } from '@/domain/product/ProductNotFound';
import { RequestNotFound } from '@/domain/request/RequestNotFound';
import { OrderedProductRepository } from '@/infra/repositories/orderedProduct/OrderedProductRepository';
import { ProductRepository } from '@/infra/repositories/product/ProductRepository';
import { RequestRepository } from "@/infra/repositories/request/RequestRepository";
import { Request, Response } from "express";
import { ZodError, z } from 'zod';

const requestRepository = new RequestRepository();
const productRepository = new ProductRepository();
const ordereProductRepository = new OrderedProductRepository()
const createOrderedProduct = new CreateOrderedProduct(
  requestRepository, productRepository, ordereProductRepository
);

class CreateOrderedProductController {
  public async handle(req: Request, res: Response) {
    const orderedProductSchema = z.object({
      idRequest: z.string().uuid(),
      idProduct: z.string().uuid(),
      amount: z.number()
    })

    try {
      const { idRequest, idProduct, amount } = orderedProductSchema.parse(req.body);

      const createOrderedProductUseCase = await createOrderedProduct.execute({
        idRequest, idProduct, amount
      })

      return res.status(201).send({ status: 201, body: { createOrderedProductUseCase } })
    } catch (error) {
      if (error instanceof ProductNotFound)
        return res.status(400).json({ status: 400, error: error.message });
      if (error instanceof RequestNotFound)
        return res.status(400).json({ status: 400, error: error.message });
      if (error instanceof ZodError)
        return res.status(400).json({ status: 400, error: "Incorrect credentials! Data must be (string & uuid)" });

      return res.status(400).json({ status: 400, error: "Internal Server Error." })
    }

  }
}

export { CreateOrderedProductController }