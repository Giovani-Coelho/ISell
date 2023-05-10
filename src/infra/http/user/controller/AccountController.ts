import { Request, Response } from "express";
import { AccountRepository } from "../../../repositories/account/AccountRepository";
import { CreateAccount } from "../../../../app/account/create/CreateAccount";
import { AccountAlreadyExists } from "../../../../domain/account/accountAlreadyExists";
import { ISuccessResponse } from "../../interfaceResponse/ISucessResponse";
import { IErrorResponse } from "../../interfaceResponse/IErrorResponse";
import { ZodError, z } from "zod";

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

    try {
      const { name, email, password } = createUserBodySchema.parse(req.body)

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
    } catch (error) {
      if (error instanceof ZodError)
        return res.status(400).json({ status: 400, error: "Short Password!" })
      if (error instanceof AccountAlreadyExists)
        return res.status(400).json({ status: 500, error: error.message })
    }
  }
}

export { AccountController }