import { IProductDTO } from "@/domain/product/IProductDTO";
import { IProductRepository } from "@/domain/product/IProductRepository";
import { Product } from "@/domain/product/Product";
import { v4 as uuid } from "uuid";


class ProductRepositoryInMemory implements IProductRepository {
  private products: Product[] = []

  public async create({ name, price, description, available, account_id }: IProductDTO): Promise<Product> {
    const product = new Product(name, price, description, available, account_id, new Date(), uuid())

    this.products.push(product)

    return product
  }
  public async list(account_id: string): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }

}

export { ProductRepositoryInMemory }