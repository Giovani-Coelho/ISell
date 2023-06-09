import { CreateAccount } from "@/app/account/create/CreateAccount"
import { CreateRequest } from "@/app/request/create/CreateRequest"
import { TRequestStatus } from "@/domain/request/TRequestStatus"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { RequestRepositoryInMemory } from "@/infra/repositories/request/RequestRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let requestRepository: RequestRepositoryInMemory
let accountRepository: AccountRepositoryInMemory
let createAccount: CreateAccount
let createRequest: CreateRequest

describe("Create Product UseCase", () => {
  beforeEach(() => {
    requestRepository = new RequestRepositoryInMemory()
    accountRepository = new AccountRepositoryInMemory()
    createAccount = new CreateAccount(accountRepository)
    createRequest = new CreateRequest(requestRepository, accountRepository)
  })

  it("Should be able to create a Request", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    const request = await createRequest.execute({
      account_id: account.id as string,
      status: "in progress"
    })

    expect(request.id).toEqual(expect.any(String));
    expect(request.status).toEqual("in progress");
  })

  it("Should be able to create a Request", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    expect(
      createRequest.execute({
        account_id: account.id as string,
        status: "in progresss" as TRequestStatus
      })).rejects
  })
})