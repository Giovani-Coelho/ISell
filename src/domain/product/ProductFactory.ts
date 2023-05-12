import { v4 as uuid } from "uuid";
import { Product } from "./Product";
import { IProductDTO } from "./productDTO";

class ProductFactory {
  public product: Product | undefined;

  public productData({ name, price, description, available, account_id }: IProductDTO) {
    this.product = new Product(name, price, description, available, account_id, new Date(), uuid())
    return this;
  }

  public create() {
    return this.product;
  }
}

export { ProductFactory }