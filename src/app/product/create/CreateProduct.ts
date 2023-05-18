import { AccountNotFound } from "@/domain/account/AccountNoFound";
import { IAccountRepository } from "@/domain/account/IAccountRepository";
import { IProductDTO } from "@/domain/product/IProductDTO";
import { IProductRepository } from "@/domain/product/IProductRepository";

class CreateProduct {
  constructor(
    private productsRepository: IProductRepository,
    private accountRepository: IAccountRepository
  ) { }

  public async execute({ name, price, amount, description, available, account_id }: IProductDTO) {
    const account = await this.accountRepository.findById(account_id);

    if (!account?.id) {
      throw new AccountNotFound();
    }

    const product = await this.productsRepository.create({ name, price, amount, description, available, account_id })

    return product
  }
}

export { CreateProduct }