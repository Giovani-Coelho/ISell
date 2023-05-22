import { CreateAccount } from "@/app/account/create/CreateAccount"
import { CreateRequest } from "@/app/request/create/CreateRequest"
import { ListRequest } from "@/app/request/list/ListRequest"
import { AccountNotFound } from "@/domain/account/AccountNoFound"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { RequestRepositoryInMemory } from "@/infra/repositories/request/RequestRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let requestRepository: RequestRepositoryInMemory
let accountRepository: AccountRepositoryInMemory
let createAccount: CreateAccount
let createRequest: CreateRequest
let listRequest: ListRequest

describe("Create Product UseCase", () => {
  beforeEach(() => {
    requestRepository = new RequestRepositoryInMemory()
    accountRepository = new AccountRepositoryInMemory()
    createAccount = new CreateAccount(accountRepository)
    createRequest = new CreateRequest(requestRepository, accountRepository)
    listRequest = new ListRequest(requestRepository, accountRepository)
  })

  it("Should be able to list Requests", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    const account_id = account.id as string;

    await createRequest.execute({
      account_id,
      status: "in progress"
    })

    await createRequest.execute({
      account_id,
      status: "in progress"
    })

    await createRequest.execute({
      account_id,
      status: "in progress"
    })

    const requests = await listRequest.execute(account_id);

    expect(requests.length).toBe(3)
  })

  it("Should return an invalid id error when listing the request", async () => {
    await expect(
      createRequest.execute({
        account_id: "1321",
        status: "in progress"
      })
    ).rejects.toThrow(AccountNotFound)
  })
})