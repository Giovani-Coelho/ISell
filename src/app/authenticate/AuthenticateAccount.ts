import jwt from 'jsonwebtoken';
import { AccountNotFound } from "@/domain/account/AccountNoFound";
import { IAccountRepository } from "@/domain/account/IAccountRepository";
import { compare } from "bcryptjs";
import dotenv from "dotenv"

dotenv.config();

export const key = 'sell';

class AuthenticateAccount {
  constructor(private accountrepository: IAccountRepository) { }

  public async execute(email: string, password: string) {
    const user = await this.accountrepository.findByEmail(email);

    if (!user) {
      throw new AccountNotFound();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AccountNotFound();
    }

    const token = jwt.sign({ id: user.id }, key, { expiresIn: "1d" });

    return token
  }
}

export { AuthenticateAccount }