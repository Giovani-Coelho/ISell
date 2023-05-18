import { CreateAccount } from "@/app/account/create/CreateAccount"
import { CreateProduct } from "@/app/product/create/CreateProduct"
import { ListAllProducts } from "@/app/product/listAll/ListAllProducts"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { ProductRepositoryInMemory } from "@/infra/repositories/product/ProductRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let productsRepository: ProductRepositoryInMemory
let accountRepository: AccountRepositoryInMemory
let createAccount: CreateAccount
let createProduct: CreateProduct
let listAllProducts: ListAllProducts

describe("List all Product UseCase", () => {
  beforeEach(() => {
    productsRepository = new ProductRepositoryInMemory();
    accountRepository = new AccountRepositoryInMemory();
    createAccount = new CreateAccount(accountRepository)
    createProduct = new CreateProduct(productsRepository, accountRepository);
    listAllProducts = new ListAllProducts(productsRepository)
  })

  it("should be able to list all products!", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    const account_id = account.id as string;

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 5,
      description: "2",
      available: true,
      account_id
    })

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 5,
      description: "2",
      available: true,
      account_id
    })

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 5,
      description: "2",
      available: true,
      account_id
    })

    const products = await listAllProducts.execute("1");

    expect(products.length).toEqual(3);
  })
})