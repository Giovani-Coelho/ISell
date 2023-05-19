import { z } from "zod";
import { Request, Response } from "express";
import { AccountNotFound } from "@/domain/account/AccountNoFound";
import { CreateRequest } from "@/app/request/create/CreateRequest";
import { Request as RequestAccount } from "@/domain/request/Request";
import { IErrorResponse } from "../../interfaceResponse/IErrorResponse";
import { ISuccessResponse } from '../../interfaceResponse/ISucessResponse';
import { AccountRepository } from "@/infra/repositories/account/AccountRepository";
import { RequestRepository } from "@/infra/repositories/request/RequestRepository";
import { requestStatusValidator } from './../../../../domain/request/TRequestStatus';

const requestRepository = new RequestRepository();
const accountRepository = new AccountRepository();
const createRequest = new CreateRequest(requestRepository, accountRepository);

type ICreateRequest = {
  request: RequestAccount
}

class CreateRequestController {
  public async handle(req: Request, res: Response<ISuccessResponse<ICreateRequest> | IErrorResponse>):
    Promise<Response<ISuccessResponse<ICreateRequest> | IErrorResponse> | undefined> {
    const createRequestSchema = z.object({
      account_id: z.string(),
      status: requestStatusValidator
    })

    try {
      const { account_id, status } = createRequestSchema.parse(req.body);

      const request = await createRequest.execute({ account_id, status });

      return res.status(201).send({
        status: 201,
        body: {
          request
        }
      })
    } catch (error) {

      if (error instanceof Error)
        return res.status(400).json({ status: 400, error: error.message })
      if (error instanceof AccountNotFound)
        return res.status(400).json({ status: 400, error: error.message });

      return res.status(400).json({ status: 400, error: "Internal server Error!" });
    }
  }
}

export { CreateRequestController }