import { CreateAccount } from "@/app/account/create/CreateAccount"
import { AccountAlreadyExists } from "@/domain/account/accountAlreadyExists"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { error } from "console"
import { beforeEach, describe, expect, it } from "vitest"

let accountRepository: AccountRepositoryInMemory
let createAccount: CreateAccount

describe("Create Account UseCase", () => {
  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    createAccount = new CreateAccount(accountRepository);
  })

  it("should be able create account", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    expect(account.id).toEqual(expect.any(String))
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
    }).rejects.toThrow()
  })
})