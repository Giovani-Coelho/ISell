import { AccountNotFound } from "@/domain/account/AccountNoFound";
import { IAccountRepository } from "@/domain/account/IAccountRepository";
import { IRequestDTO } from "@/domain/request/IRequestDTO";
import { IRequestRepository } from "@/domain/request/IRequestRepository";
import { Request } from "@/domain/request/Request";

class CreateRequest {
  constructor(
    private requestRepository: IRequestRepository,
    private accountRepository: IAccountRepository
  ) { }

  public async execute({ account_id, status }: IRequestDTO): Promise<Request> {
    const account = await this.accountRepository.findById(account_id);

    if (!account) {
      throw new AccountNotFound();
    }

    const req = await this.requestRepository.create({ account_id, status });

    return req
  }
}

export { CreateRequest }