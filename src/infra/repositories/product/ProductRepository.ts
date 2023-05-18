import { IProductDTO } from "@/domain/product/IProductDTO";
import { IProductRepository } from "@/domain/product/IProductRepository";
import { Product } from "@/domain/product/Product";
import { prisma } from "@/lib/prismaClient";

class ProductRepository implements IProductRepository {

  public async create({ name, price, description, available, account_id }: IProductDTO, amount: number): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        available,
        account_id
      }
    })

    await prisma.stock.create({
      data: {
        product_id: product.id,
        amount
      }
    })

    return product
  }

  public async list(account_id: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        account_id
      }
    })

    return products
  }

  public async listAll(page: string): Promise<Product[]> {
    const pag = parseInt(page)

    const products = await prisma.product.findMany();

    const productsPagination = products.slice((pag - 1) * 20, pag * 20);

    return productsPagination;
  }
}

export { ProductRepository }