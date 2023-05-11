
import { Account } from "@/domain/account/Account";
import { IAccountRepository } from "@/domain/account/IAccountRepository";
import { IAccountDTO } from "@/domain/account/accountDTO";
import { v4 as uuid } from "uuid";


class AccountRepositoryInMemory implements IAccountRepository {

  private accounts: Account[] = []

  public async create({ name, email, password }: IAccountDTO): Promise<Account> {
    const account = new Account(name, email, password, new Date(), uuid())

    this.accounts.push(account)

    return account
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const account = this.accounts.find(acc => acc.email === email)

    if (!account) {
      return null
    }

    return account
  }

}

export { AccountRepositoryInMemory }