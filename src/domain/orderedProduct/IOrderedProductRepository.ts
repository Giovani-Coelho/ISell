import { IOrderedProductDTO } from "./IOrderedProductDTO";
import { OrderedProduct } from "./OrderedProduct";

export interface IOrderedProductRepositoy {
  create({ idRequest, idProduct, amount }: IOrderedProductDTO): Promise<OrderedProduct>
  list(request_id: string): Promise<OrderedProduct[]>
} 