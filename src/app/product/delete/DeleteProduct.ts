import { IProductRepository } from "@/domain/product/IProductRepository";
import { ProductIsNotAccount } from "@/domain/product/ProductIsNotAccount";
import { ProductNotFound } from "@/domain/product/ProductNotFound";

class DeleteProduct {
  constructor(private productRepository: IProductRepository) { }

  public async execute(account_id: string, product_id: string): Promise<void> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new ProductNotFound();
    }

    if (product.account_id !== account_id) {
      throw new ProductIsNotAccount();
    }

    this.productRepository.deleteProduct(product_id);
  }
}

export { DeleteProduct }