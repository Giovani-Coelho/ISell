import { IProductDTO } from "@/domain/product/IProductDTO";
import { IProductRepository } from "@/domain/product/IProductRepository";
import { Product } from "@/domain/product/Product";
import { v4 as uuid } from "uuid";

class ProductRepositoryInMemory implements IProductRepository {

  private products: Product[] = []

  public async create({ name, price, amount, description, available, account_id }: IProductDTO): Promise<Product> {
    const product = new Product(name, price, amount, description, available, account_id, new Date(), uuid());

    this.products.push(product);

    return product;
  }

  public async list(account_id: string): Promise<Product[]> {
    const product = this.products.filter(product => product.account_id === account_id);

    return product;
  }

  public async listAll(page: string): Promise<Product[]> {
    const pag = parseInt(page);

    const product = this.products.slice((pag - 1) * 20, pag * 20);

    return product;
  }

  public async findById(product_id: string): Promise<Product | null> {
    const product = this.products.find(product => product.id === product_id);

    if (!product) return null

    return product
  }
}

export { ProductRepositoryInMemory }