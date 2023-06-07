import { DeleteProduct } from "@/app/product/delete/DeleteProduct";
import { ProductIsNotAccount } from "@/domain/product/ProductIsNotAccount";
import { ProductNotFound } from "@/domain/product/ProductNotFound";
import { ProductRepository } from "@/infra/repositories/product/ProductRepository";
import { Request, Response } from "express";
import { ZodError, z } from "zod";

const productRepository = new ProductRepository();
const deleteProduct = new DeleteProduct(productRepository);

class DeleteProductController {
  public async handle(req: Request, res: Response) {
    const accountSchema = z.object({
      account_id: z.string().uuid()
    })

    const productSchema = z.object({
      product_id: z.string().uuid()
    })

    try {
      const { account_id } = accountSchema.parse(req.params);
      const { product_id } = productSchema.parse(req.body);

      await deleteProduct.execute(account_id, product_id);

      return res.status(204).send({ status: 204, message: "Product deleted successfully" });

    } catch (error) {
      if (error instanceof ZodError)
        return res.status(400).json({ status: 400, message: "Incorrect Credentials!" })

      if (error instanceof ProductNotFound)
        return res.status(400).json({ status: 400, message: error.message })

      if (error instanceof ProductIsNotAccount)
        return res.status(400).json({ status: 400, message: error.message })


      return res.status(400).json({ status: 400, message: "Internal Server Error!" })
    }
  }
}

export { DeleteProductController }