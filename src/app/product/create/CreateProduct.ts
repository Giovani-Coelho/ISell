import { IProductDTO } from "@/domain/product/IProductDTO";
import { IProductRepository } from "@/domain/product/IProductRepository";

class CreateProduct {
  constructor(private productsRepository: IProductRepository) { }

  public async execute({ name, price, description, available, account_id }: IProductDTO, amount: number) {
    const product = await this.productsRepository.create({ name, price, description, available, account_id }, amount)

    return product
  }
}

export { CreateProduct }