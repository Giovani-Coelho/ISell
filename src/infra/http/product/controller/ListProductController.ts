import { ListProduct } from '@/app/product/list/ListProducts';
import { ProductRepository } from '@/infra/repositories/product/ProductRepository';
import { Request, Response } from "express";
import { ISuccessResponse } from '../../interfaceResponse/ISucessResponse';
import { Product } from '@/domain/product/Product';
import { IErrorResponse } from '../../interfaceResponse/IErrorResponse';
import { ZodError, z } from 'zod';
import { AccountRepository } from '@/infra/repositories/account/AccountRepository';
import { AccountNotFound } from '@/domain/account/AccountNoFound';
import { NoProducts } from '@/domain/product/NoProducts';

const accountRepository = new AccountRepository();
const productRepository = new ProductRepository();
const listProductUseCase = new ListProduct(productRepository, accountRepository);

type IListProductRequest = {
  products: Product[]
}

class ListProductController {
  public async handle(req: Request, res: Response<ISuccessResponse<IListProductRequest> | IErrorResponse>):
    Promise<Response<ISuccessResponse<IListProductRequest> | IErrorResponse> | undefined> {
    const accountSchema = z.object({
      account_id: z.string()
    })


    try {
      const { account_id } = accountSchema.parse(req.params);

      const products = await listProductUseCase.execute(account_id);

      return res.status(200).send({
        status: 200,
        body: {
          products
        }
      })
    } catch (error) {
      if (error instanceof ZodError)
        return res.status(400).json({ status: 400, error: "Account id incorrect" });
      if (error instanceof AccountNotFound)
        return res.status(400).json({ status: 400, error: error.message })
      if (error instanceof NoProducts)
        return res.status(400).json({ status: 400, error: error.message })
      res.status(400).json({ status: 400, error: "" })
    }
  }
}

export { ListProductController }