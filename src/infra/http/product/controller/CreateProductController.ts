import { CreateProduct } from "@/app/product/create/CreateProduct";
import { ProductRepository } from "@/infra/repositories/product/ProductRepository";
import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { ISuccessResponse } from "../../interfaceResponse/ISucessResponse";
import { IErrorResponse } from "../../interfaceResponse/IErrorResponse";
import { AccountNotFound } from "@/domain/account/AccountNoFound";
import { AccountRepository } from "@/infra/repositories/account/AccountRepository";

const productRepository = new ProductRepository();
const accountRepository = new AccountRepository()
const productuseCase = new CreateProduct(productRepository, accountRepository);

type ICreateProductResponse = {
  product: {
    name: string;
    price: number;
    amount: number;
    description: string | null;
    available: boolean;
    account_id: string;
  }
}

class CreateProductController {
  public async handle(req: Request, res: Response<ISuccessResponse<ICreateProductResponse> | IErrorResponse>):
    Promise<Response<ISuccessResponse<ICreateProductResponse> | IErrorResponse> | undefined> {
    const productSchema = z.object({
      name: z.string(),
      price: z.number(),
      amount: z.number(),
      description: z.string().nullable(),
      available: z.boolean(),
      account_id: z.string()
    })

    try {
      const { name, price, amount, description, available, account_id, } = productSchema.parse(req.body);

      const product = await productuseCase.execute({ name, price, amount, description, available, account_id, });

      return res.status(201).send({
        status: 201,
        body: {
          product: {
            name: product.name,
            price: product.price,
            amount: product.amount,
            description: product.description,
            available: product.available,
            account_id: product.account_id,
          }
        }
      })
    } catch (error) {
      if (error instanceof AccountNotFound)
        return res.status(400).json({ status: 400, error: error.message })
      if (error instanceof ZodError)
        return res.status(400).json({ status: 400, error: "Incorrect credentials!" })
    }
  }
}

export { CreateProductController }