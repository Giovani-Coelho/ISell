import { CreateAccount } from "@/app/account/create/CreateAccount"
import { CreateProduct } from "@/app/product/create/CreateProduct"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { ProductRepositoryInMemory } from "@/infra/repositories/product/ProductRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let productRepository: ProductRepositoryInMemory
let accountRepository: AccountRepositoryInMemory
let createAccount: CreateAccount
let createProduct: CreateProduct

describe("Create Product UseCase", () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory()
    accountRepository = new AccountRepositoryInMemory()
    createAccount = new CreateAccount(accountRepository)
    createProduct = new CreateProduct(productRepository, accountRepository)
  })

  it("Should be able create a Product", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    const product = await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 2,
      description: "",
      available: true,
      account_id: account.id as string
    })

    expect(product.id).toEqual(expect.any(String))
  })
})