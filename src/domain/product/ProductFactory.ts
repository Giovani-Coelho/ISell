import { v4 as uuid } from "uuid";
import { Product } from "./Product";
import { IProductDTO } from "./IProductDTO";

class ProductFactory {
  public product: Product | undefined;

  public productData({ name, price, amount, description, available, account_id }: IProductDTO) {
    this.product = new Product(name, price, amount, description, available, account_id, new Date(), uuid())
    return this;
  }

  public create() {
    return this.product;
  }
}

export { ProductFactory }