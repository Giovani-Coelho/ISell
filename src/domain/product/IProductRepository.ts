import { Account } from "../account/Account";
import { IProductDTO } from "./IProductDTO";
import { Product } from "./Product";


export interface IProductRepository {
  create({ name, price, description, available, account_id }: IProductDTO): Promise<Product>
  list(account_id: string): Promise<Product[]>
}