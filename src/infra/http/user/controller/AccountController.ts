import { Request, Response } from "express";
import { AccountRepository } from "../../../repositories/account/AccountRepository";
import { CreateAccount } from "../../../../app/account/create/CreateAccount";
import { z } from "zod";
import { AccountAlreadyExists } from "../../../../domain/account/accountAlreadyExists";
import { ISuccessResponse } from "../../interfaceResponse/ISucessResponse";
import { IErrorResponse } from "../../interfaceResponse/IErrorResponse";

type IAccountResponse = { account: { name: string, email: string, password: string } }

const accountRepository = new AccountRepository();
const accountUseCase = new CreateAccount(accountRepository);

class AccountController {
  public async create(req: Request, res: Response<ISuccessResponse<IAccountResponse> | IErrorResponse>):
    Promise<Response<ISuccessResponse<IAccountResponse> | IErrorResponse> | undefined> {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(4)
    })

    const { name, email, password } = createUserBodySchema.parse(req.body)

    try {
      const account = await accountUseCase.execute({ name, email, password })

      return res.status(201).send({
        status: 201,
        body: {
          account: {
            name: account.name,
            email: account.email,
            password: account.password,
          }
        },
      })
    } catch (err) {
      if (err instanceof AccountAlreadyExists) {
        return res.status(400).send({
          status: 400,
          err: err.message,
          success: false,
          error: true
        })
      }
    }
  }
}

export { AccountController }