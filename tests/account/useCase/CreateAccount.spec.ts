import { CreateAccount } from "@/app/account/create/CreateAccount"
import { AccountAlreadyExists } from "@/domain/account/accountAlreadyExists"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { compare, hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"

let accountRepository: AccountRepositoryInMemory
let createAccount: CreateAccount

describe("Create Account UseCase", () => {
  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    createAccount = new CreateAccount(accountRepository);
  })

  it("Should be able create account", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    expect(account.id).toEqual(expect.any(String))
  })

  it("Should be able to encrypt the password", async () => {
    const { password } = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })
    // compara a senha e verifica se a senha criada corresponde a uma senha criptografada
    const passwordHash = await compare("123456", password)

    expect(passwordHash).toBe(true)
  })

  it("Unable to create an account that already exists", async () => {
    await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    await expect(async () => {
      await createAccount.execute({
        name: "Giovani Coelho",
        email: "giovanicoelho@hotmail.com",
        password: "123456"
      })
    }).rejects.toThrow(AccountAlreadyExists)
  })
})