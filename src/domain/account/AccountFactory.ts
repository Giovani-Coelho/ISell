import { Account } from "./Account";
import { v4 as uuid } from 'uuid';


class AccountFactory {
  private account: Account | undefined;

  public accountData(name: string, email: string, password: string): AccountFactory {
    this.account = new Account(name, email, password, new Date(), uuid())

    return this
  }

  public create(): Account | undefined {
    return this.account
  }
}

export { AccountFactory }