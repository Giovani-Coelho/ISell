import { Account } from "../account/Account"

class Product {
  public id?: string;
  public name: String;
  public price: number;
  public description?: string | undefined;
  public available: boolean;
  public account_id: string;
  public created_at: Date;

  public constructor(name: string, price: number, description: string | undefined, available: boolean, account_id: string, created_at: Date, id?: string) {
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