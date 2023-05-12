import { CreateAccount } from "@/app/account/create/CreateAccount"
import { AccountFactory } from "@/domain/account/AccountFactory"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let accountFactory: AccountFactory

describe("Create Account", () => {
  beforeEach(() => {
    accountFactory = new AccountFactory();
  })

  it("Should be able create a new account", () => {
    const account = accountFactory.accountData("Giovani Coelho", "giovanicoelho@hotmail.com", "123456",).create()

    expect(account).toHaveProperty("id")
  })
})