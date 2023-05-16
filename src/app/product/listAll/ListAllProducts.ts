import { IProductRepository } from "@/domain/product/IProductRepository";


class ListAllProducts {
  constructor(private productsRepository: IProductRepository) { }

  public async execute(page: string) {
    const products = await this.productsRepository.listAll(page);

    return products
  }
}

export { ListAllProducts }