import { AccountNotFound } from '@/domain/account/AccountNoFound';
import { IAccountRepository } from '@/domain/account/IAccountRepository';
import { IRequestRepository } from '@/domain/request/IRequestRepository';
import { Request } from "@/domain/request/Request"

class ListRequest {
  constructor(
    private requestRepository: IRequestRepository,
    private accountRepository: IAccountRepository
  ) { }

  public async execute(account_id: string): Promise<Request[]> {
    const account = await this.accountRepository.findById(account_id);

    if (!account) {
      throw new AccountNotFound();
    }

    const requests = await this.requestRepository.list(account_id);

    return requests
  }
}

export { ListRequest }