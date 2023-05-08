import { Request, Response } from "express";
import { ISuccessResponse } from "../../interfaceResponse/ISucessResponse";
import { IErrorResponse } from "../../interfaceResponse/IErrorResponse";
import { AccountRepository } from "../../../repositories/account/AccountRepository";
import { CreateAccount } from "../../../../app/account/create/CreateAccount";

type IAccountResponse = { account: { name: string, email: string, password: string } }

const accountRepository = new AccountRepository();
const accountUseCase = new CreateAccount(accountRepository);

class AccountController {
  public async create(req: Request, res: Response<ISuccessResponse<IAccountResponse> | IErrorResponse>):
    Promise<Response<ISuccessResponse<IAccountResponse> | IErrorResponse>> {
    const { name, email, password } = req.body

    const account = await accountUseCase.execute({ name, email, password })

    try {
      return res.status(201).send({
        status: 201,
        body: {
          account: {
            name: account.name,
            email: account.email,
            password: account.password,
          }
        },
        success: true,
        error: false,
      })
    } catch (error) {
      return res.status(400).send({
        status: 400,
        success: false,
        error: true,
        message: "a"
      })
    }
  }
}


export { AccountController }