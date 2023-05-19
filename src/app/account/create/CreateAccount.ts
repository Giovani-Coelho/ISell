import { Account } from "@/domain/account/Account";
import { IAccountRepository } from "@/domain/account/IAccountRepository";
import { AccountAlreadyExists } from "@/domain/account/accountAlreadyExists";
import { IAccountDTO } from "@/domain/account/accountDTO";
import { hash } from "bcryptjs";

class CreateAccount {
  constructor(private accountRepository: IAccountRepository) { }

  public async execute({ name, email, password }: IAccountDTO): Promise<Account> {

    const passwordHash = await hash(password, 6)

    const accountAlreadyExists = await this.accountRepository.findByEmail(email)

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const user = await this.accountRepository.create({
      name,
      email,
      password: passwordHash
    })

    return user
  }
}

export { CreateAccount }