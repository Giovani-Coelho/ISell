import { IProductDTO } from "@/domain/product/IProductDTO";
import { IProductRepository } from "@/domain/product/IProductRepository";

class CreateProduct {
  constructor(private productsRepository: IProductRepository) { }

  public async execute({ name, price, amount, description, available, account_id }: IProductDTO) {
    const product = await this.productsRepository.create({ name, price, amount, description, available, account_id })

    return product
  }
}

export { CreateProduct }