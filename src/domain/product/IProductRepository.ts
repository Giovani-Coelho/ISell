import { IProductDTO } from "./IProductDTO";
import { Product } from "./Product";

export interface IProductRepository {
  create({ name, price, description, available, account_id }: IProductDTO, amount: number): Promise<Product>
  list(account_id: string): Promise<Product[]>
  listAll(page: string): Promise<Product[]>
}