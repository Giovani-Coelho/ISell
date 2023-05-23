import { v4 as uuid } from "uuid";
import { IOrderedProductDTO } from "./IOrderedProductDTO";
import { OrderedProduct } from "./OrderedProduct";

class OrderedProductFactory {
  private orderedProduct: OrderedProduct | undefined;

  public orderedProductData({ idRequest, idProduct, amount }: IOrderedProductDTO): OrderedProductFactory {
    this.orderedProduct = new OrderedProduct(idRequest, idProduct, amount, new Date(), uuid())

    return this
  }

  public create(): OrderedProduct | undefined {
    return this.orderedProduct
  }
}

export { OrderedProductFactory }