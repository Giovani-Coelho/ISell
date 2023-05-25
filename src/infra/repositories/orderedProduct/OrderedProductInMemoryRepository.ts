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

  public async list(request_id: string): Promise<OrderedProduct[]> {
    const orderedProduct = this.orderedProducts.filter(product => product.request_id === request_id);

    return orderedProduct
  }
}

export { OrderedProductInMemoryRepository }