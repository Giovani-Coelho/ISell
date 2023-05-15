import { IProductRepository } from "@/domain/product/IProductRepository"
import { IAccountRepository } from '@/domain/account/IAccountRepository';
import { AccountNotFound } from '@/domain/account/AccountNoFound';
import { NoProducts } from '@/domain/product/NoProducts';

class ListProduct {
  constructor(
    private productRepository: IProductRepository,
    private accountRepository: IAccountRepository
  ) { }

  public async execute(account_id: string) {

    const account = await this.accountRepository.findById(account_id);

    if (!account) {
      throw new AccountNotFound();
    }

    const products = await this.productRepository.list(account_id);

    if (products.length === 0) {
      throw new NoProducts();
    }

    return products;
  }
}

export { ListProduct }