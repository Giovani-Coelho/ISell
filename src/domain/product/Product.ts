
class Product {
  public id?: string;
  public name: string;
  public price: number;
  public description: string | null;
  public available: boolean;
  public account_id: string;
  public created_at?: Date;

  public constructor(name: string, price: number, description: string | null, available: boolean, account_id: string, created_at?: Date, id?: string) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.available = available;
    this.account_id = account_id;

    if (created_at) {
      this.created_at = created_at;
    }

    if (id) {
      this.id = id;
    }
  }
}

export { Product }