import { IProductRepository } from "@/domain/product/IProductRepository";
import { Product } from "@/domain/product/Product";


class ListAllProducts {
  constructor(private productsRepository: IProductRepository) { }

  public async execute(page: string): Promise<Product[]> {
    const products = await this.productsRepository.listAll(page);

    return products
  }
}

export { ListAllProducts }