import { StringifyOptions } from "querystring"
import { Account } from "../account/Account"

class Product {
  public id?: string
  public name: String
  public price: number
  public description?: string
  public available: boolean
  public account_id: Account
  public created_at: Date

  public constructor(id: string, name: string, price: number, description: string, available: boolean, account_id: Account, created_at: Date) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.available = available;
    this.account_id = account_id;
    this.created_at = created_at;

    if (id) {
      this.id = id;
    }
  }
}

export { Product }