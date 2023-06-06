import { IProductRepository } from "@/domain/product/IProductRepository";
import { ProductNotFound } from "@/domain/product/ProductNotFound";

class DeleteProduct {
  constructor(private productRepository: IProductRepository) { }

  public async execute(product_id: string): Promise<null> {
    const product = this.productRepository.findById(product_id);

    if (!product) {
      throw new ProductNotFound();
    }

    const deleteProduct = this.productRepository.deleteProduct(product_id);

    return deleteProduct;
  }
}

export { DeleteProduct }