import { IProductDTO } from "@/domain/product/IProductDTO";
import { IProductRepository } from "@/domain/product/IProductRepository";
import { Product } from "@/domain/product/Product";
import { prisma } from "@/lib/prismaClient";

class ProductRepository implements IProductRepository {

  public async create({ name, price, amount, description, available, account_id }: IProductDTO): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        amount,
        description,
        available,
        account_id
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

  public async findById(product_id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id: product_id
      }
    })

    if (!product) return null;

    return product
  }

  public async deleteProduct(product_id: string): Promise<null> {
    await prisma.product.delete({
      where: {
        id: product_id
      }
    });

    return null;
  }
}

export { ProductRepository }