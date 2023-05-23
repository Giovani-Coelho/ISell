import { IProductDTO } from "./IProductDTO";
import { Product } from "./Product";

export interface IProductRepository {
  create({ name, price, amount, description, available, account_id }: IProductDTO): Promise<Product>
  list(account_id: string): Promise<Product[]>
  listAll(page: string): Promise<Product[]>
  findById(product_id: string): Promise<Product | null>
}