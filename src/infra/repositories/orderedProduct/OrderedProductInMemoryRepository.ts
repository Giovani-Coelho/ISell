import { IOrderedProductDTO } from "@/domain/orderedProduct/IOrderedProductDTO";
import { IOrderedProductRepositoy } from "@/domain/orderedProduct/IOrderedProductRepository";
import { OrderedProduct } from "@/domain/orderedProduct/OrderedProduct";


class OrderedProductInMemoryRepository implements IOrderedProductRepositoy {
  public async create({ idRequest, idProduct, amount }: IOrderedProductDTO): Promise<OrderedProduct> {
    throw new Error("Method not implemented.");
  }
}

export { OrderedProductInMemoryRepository }