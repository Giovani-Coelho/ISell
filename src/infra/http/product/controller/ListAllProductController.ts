import { ISuccessResponse } from './../../interfaceResponse/ISucessResponse';
import { ListAllProducts } from "@/app/product/listAll/ListAllProducts";
import { IProductRepository } from "@/domain/product/IProductRepository";
import { ProductRepository } from "@/infra/repositories/product/ProductRepository";
import { Request, Response } from "express";
import { IListProductResponse } from '../../interfaceResponse/IListProductResponse';
import { IErrorResponse } from '../../interfaceResponse/IErrorResponse';
import { number, z } from 'zod';

const productRepository: IProductRepository = new ProductRepository();
const listAllProduct: ListAllProducts = new ListAllProducts(productRepository);

class ListAllProductController {

  public async handle(req: Request, res: Response<ISuccessResponse<IListProductResponse> | IErrorResponse>):
    Promise<Response<ISuccessResponse<IListProductResponse> | IErrorResponse> | undefined> {

    const pageSchema = z.object({
      page: z.string()
    })

    const { page } = pageSchema.parse(req.params);

    try {
      const products = await listAllProduct.execute(page)

      return res.status(200).send({ status: 200, body: { products } })
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).send({ status: 400, error: error.message })
    }
  }
}

export { ListAllProductController }