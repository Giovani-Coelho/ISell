import { IAccountRepository } from "../../../domain/account/IAccountRepository";
import { AccountAlreadyExists } from "../../../domain/account/accountAlreadyExists";
import { IAccountDTO } from "../../../domain/account/accountDTO";

class CreateAccount {
  constructor(private accountRepository: IAccountRepository) { }

  public async execute({ name, email, password }: IAccountDTO) {

    const userAlreadyExists = await this.accountRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    const user = await this.accountRepository.create({ name, email, password })

    return user
  }
}

export { CreateAccount }