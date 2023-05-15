import { Account } from "./Account";
import { IAccountDTO } from "./accountDTO";


export interface IAccountRepository {
  create(data: IAccountDTO): Promise<Account>
  findByEmail(email: string): Promise<Account | null>
  findById(id: string): Promise<Account | null>
} 