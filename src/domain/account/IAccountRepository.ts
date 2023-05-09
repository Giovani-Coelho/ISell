import { Account } from "@prisma/client";
import { IAccountDTO } from "./accountDTO";


export interface IAccountRepository {
  create(data: IAccountDTO): Promise<Account>
  findByEmail(email: string): Promise<Account | null>
} 