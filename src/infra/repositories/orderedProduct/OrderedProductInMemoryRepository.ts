import { IOrderedProductDTO } from "@/domain/orderedProduct/IOrderedProductDTO";
import { IOrderedProductRepositoy } from "@/domain/orderedProduct/IOrderedProductRepository";
import { OrderedProduct } from "@/domain/orderedProduct/OrderedProduct";

class OrderedProductInMemoryRepository implements IOrderedProductRepositoy {
  public orderedProducts: OrderedProduct[] = []

  public async create({ idRequest, idProduct, amount }: IOrderedProductDTO): Promise<OrderedProduct> {
    const orderedProduct = new OrderedProduct(idRequest, idProduct, amount)

    this.orderedProducts.push(orderedProduct);

    return orderedProduct
  }
}

export { OrderedProductInMemoryRepository }