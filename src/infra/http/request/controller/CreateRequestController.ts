import { requestStatusValidator } from './../../../../domain/request/TRequestStatus';
import { CreateRequest } from "@/app/request/create/CreateRequest";
import { AccountNotFound } from "@/domain/account/AccountNoFound";
import { AccountRepository } from "@/infra/repositories/account/AccountRepository";
import { RequestRepository } from "@/infra/repositories/request/RequestRepository";
import { Request, Response } from "express";
import { z } from "zod";

const requestRepository = new RequestRepository();
const accountRepository = new AccountRepository();
const createRequest = new CreateRequest(requestRepository, accountRepository);

class CreateRequestController {
  public async handle(req: Request, res: Response) {
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