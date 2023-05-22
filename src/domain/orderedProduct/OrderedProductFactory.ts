import { IOrderedProductDTO } from "./IOrderedProductDTO";
import { OrderedProduct } from "./OrderedProduct";

class OrderedProductFactory {
  private account: OrderedProduct | undefined;

  public orderedProductData({ idRequest, idProduct, amount }: IOrderedProductDTO): OrderedProductFactory {
    this.account = new OrderedProduct(idRequest, idProduct, amount)

    return this
  }

  public create(): OrderedProduct | undefined {
    return this.account
  }
}

export { OrderedProductFactory }