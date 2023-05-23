import { IRequestDTO } from "@/domain/request/IRequestDTO";
import { IRequestRepository } from "@/domain/request/IRequestRepository";
import { Request } from "@/domain/request/Request";
import { v4 as uuid } from "uuid";

class RequestRepositoryInMemory implements IRequestRepository {
  public requests: Request[] = []

  public async create({ account_id, status }: IRequestDTO): Promise<Request> {
    const request = new Request(account_id, status, new Date(), uuid());

    this.requests.push(request);

    return request
  }

  public async list(account_id: string): Promise<Request[]> {
    const products = this.requests.filter(acc => acc.account_id === account_id)

    return products
  }

  public async findById(requestId: string): Promise<Request | null> {
    const request = this.requests.find(req => req.id === requestId);

    if (!request) return null

    return request
  }
}

export { RequestRepositoryInMemory }