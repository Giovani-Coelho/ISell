import { CreateProduct } from '@/app/product/create/CreateProduct';
import { CreateAccount } from "@/app/account/create/CreateAccount"
import { ListProduct } from "@/app/product/list/ListProducts"
import { AccountNotFound } from "@/domain/account/AccountNoFound"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { ProductRepositoryInMemory } from "@/infra/repositories/product/ProductRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"
import { NoProducts } from '@/domain/product/NoProducts';

let productRepository: ProductRepositoryInMemory
let accountRepository: AccountRepositoryInMemory
let createAccount: CreateAccount
let createProduct: CreateProduct
let listProduct: ListProduct

describe("List Product UseCase", () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory()
    accountRepository = new AccountRepositoryInMemory()
    createAccount = new CreateAccount(accountRepository)
    createProduct = new CreateProduct(productRepository)
    listProduct = new ListProduct(productRepository, accountRepository)
  })

  it("Should be able to list products", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    const account_id = account.id as string;

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      description: "",
      available: true,
      account_id: account_id
    })

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      description: "",
      available: true,
      account_id: account_id
    })

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      description: "",
      available: true,
      account_id: account_id
    })

    const listProducts = await listProduct.execute(account_id)

    expect(listProducts.length).toEqual(3);
  })

  it("Should not be possible to list products from a non-existent account", async () => {
    expect(async () => {
      await listProduct.execute("123456")
    }).rejects.toThrow(AccountNotFound);
  })

  it("Should not be able to list products if the user does not have", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    const account_id = account.id as string;

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      description: "",
      available: true,
      account_id: "5123151"
    })

    expect(async () => {
      await listProduct.execute(account_id)
    }).rejects.toThrow(NoProducts);
  })
})