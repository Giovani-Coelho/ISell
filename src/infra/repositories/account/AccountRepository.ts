import { Account } from "@/domain/account/Account"
import { IAccountRepository } from "@/domain/account/IAccountRepository"
import { IAccountDTO } from "@/domain/account/accountDTO"
import { prisma } from "@/lib/prismaClient"

class AccountRepository implements IAccountRepository {

  public async create({ name, email, password }: IAccountDTO): Promise<Account> {
    const account = await prisma.account.create({
      data: {
        name,
        email,
        password
      }
    })

    return account
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const user = await prisma.account.findFirst({
      where: {
        email
      }
    })

    return user
  }

  public async findById(id: string): Promise<Account | null> {
    const account = await prisma.account.findFirst({
      where: {
        id
      }
    })

    return account
  }
}

export { AccountRepository }