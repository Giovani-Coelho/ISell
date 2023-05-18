import { IRequestDTO } from "@/domain/request/IRequestDTO";
import { IRequestRepository } from "@/domain/request/IRequestRepository";
import { prisma } from "@/lib/prismaClient";
import { Request } from "@/domain/request/Request"

class RequestRepository implements IRequestRepository {
  public async create({ account_id, status }: IRequestDTO): Promise<Request> {
    const request = await prisma.request.create({
      data: {
        account_id,
        status
      }
    })

    return request
  }
}

export { RequestRepository }