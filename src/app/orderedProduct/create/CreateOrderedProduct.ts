import { IOrderedProductDTO } from "@/domain/orderedProduct/IOrderedProductDTO";
import { IOrderedProductRepositoy } from "@/domain/orderedProduct/IOrderedProductRepository";
import { OrderedProduct } from "@/domain/orderedProduct/OrderedProduct";
import { IProductRepository } from "@/domain/product/IProductRepository";
import { ProductNotFound } from "@/domain/product/ProductNotFound";
import { IRequestRepository } from "@/domain/request/IRequestRepository";
import { RequestNotFound } from "@/domain/request/RequestNotFound";

class CreateOrderedProduct {
  constructor(
    private requestRepository: IRequestRepository,
    private productRepository: IProductRepository,
    private orderedProductRepository: IOrderedProductRepositoy
  ) { }

  public async execute({ idRequest, idProduct, amount }: IOrderedProductDTO): Promise<OrderedProduct> {
    const request = await this.requestRepository.findById(idRequest);

    if (!request) {
      throw new RequestNotFound();
    }

    const product = await this.productRepository.findById(idProduct);

    if (!product) {
      throw new ProductNotFound();
    }

    const orderedProduct = await this.orderedProductRepository.create({ idRequest, idProduct, amount });

    return orderedProduct;
  }
}

export { CreateOrderedProduct }