import { AuthenticateAccount } from "@/app/authenticate/AuthenticateAccount";
import { AccountRepository } from "@/infra/repositories/account/AccountRepository";
import { Request, Response } from "express";

const accountRepository = new AccountRepository();
const authenticateAccount = new AuthenticateAccount(accountRepository);

class AuthenticateAccountController {
  public async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await authenticateAccount.execute(email, password);

      res.status(200).send({ token: token })
    } catch (error) {
      res.status(400).send({ error: error })
    }
  }
}

export { AuthenticateAccountController }