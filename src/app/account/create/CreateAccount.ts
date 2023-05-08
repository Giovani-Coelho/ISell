import { IAccountRepository } from "../../../domain/account/IAccountRepository";
import { IAccountDTO } from "../../../domain/account/accountDTO";


class CreateAccount {
  constructor(private accountRepository: IAccountRepository) { }

  public async execute({ name, email, password }: IAccountDTO) {
    const user = await this.accountRepository.create({ name, email, password })

    return user
  }
}

export { CreateAccount }