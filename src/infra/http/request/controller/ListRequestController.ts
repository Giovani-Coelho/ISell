import { ZodError, z } from "zod";
import { Request, Response } from "express";
import { ListRequest } from "@/app/request/list/ListRequest";
import { AccountNotFound } from "@/domain/account/AccountNoFound";
import { IListRequest } from "../../interfaceResponse/IListRequest";
import { IErrorResponse } from "../../interfaceResponse/IErrorResponse";
import { ISuccessResponse } from "../../interfaceResponse/ISucessResponse";
import { AccountRepository } from "@/infra/repositories/account/AccountRepository";
import { RequestRepository } from "@/infra/repositories/request/RequestRepository";

const requestRepository = new RequestRepository();
const accountRepository = new AccountRepository();
const listRequest = new ListRequest(requestRepository, accountRepository);

class ListRequestController {
  public async handle(req: Request, res: Response<ISuccessResponse<IListRequest> | IErrorResponse>):
    Promise<Response<ISuccessResponse<IListRequest> | IErrorResponse> | undefined> {

    const requestListSchema = z.object({ account_id: z.string() })

    try {
      const { account_id } = requestListSchema.parse(req.query);

      const requestList = await listRequest.execute(account_id as string);

      return res.status(200).send({ status: 200, body: { requestList } })

    } catch (err) {

      if (err instanceof AccountNotFound)
        return res.status(400).json({ status: 400, error: err.message })
      if (err instanceof ZodError)
        return res.status(400).json({ status: 400, error: "Incorrect credentials!" })

      return res.status(400).json({ status: 400, error: 'Internal server Error!' })
    }
  }
}

export { ListRequestController }