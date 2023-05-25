import { CreateAccount } from "@/app/account/create/CreateAccount"
import { CreateOrderedProduct } from "@/app/orderedProduct/create/CreateOrderedProduct"
import { CreateProduct } from "@/app/product/create/CreateProduct"
import { CreateRequest } from "@/app/request/create/CreateRequest"
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory"
import { OrderedProductInMemoryRepository } from "@/infra/repositories/orderedProduct/OrderedProductInMemoryRepository"
import { ProductRepositoryInMemory } from "@/infra/repositories/product/ProductRepositoryInMemory"
import { RequestRepositoryInMemory } from "@/infra/repositories/request/RequestRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let requestRepository: RequestRepositoryInMemory
let accountRepository: AccountRepositoryInMemory
let productRepository: ProductRepositoryInMemory
let orderedProductRepository: OrderedProductInMemoryRepository

let createOrderedProduct: CreateOrderedProduct
let createProduct: CreateProduct
let createAccount: CreateAccount
let createRequest: CreateRequest

describe("create an order for a product", () => {
  beforeEach(() => {
    requestRepository = new RequestRepositoryInMemory();
    accountRepository = new AccountRepositoryInMemory();
    productRepository = new ProductRepositoryInMemory()
    orderedProductRepository = new OrderedProductInMemoryRepository();

    createOrderedProduct = new CreateOrderedProduct(
      requestRepository, productRepository, orderedProductRepository
    );
    createAccount = new CreateAccount(accountRepository);
    createRequest = new CreateRequest(requestRepository, accountRepository);
    createProduct = new CreateProduct(productRepository, accountRepository)
  })

  it("Should be able to order a product", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    const request = await createRequest.execute({
      account_id: account.id as string,
      status: "in progress"
    })

    const product = await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 2,
      description: "",
      available: true,
      account_id: account.id as string
    })

    const ordernedProduct = await createOrderedProduct.execute({
      idRequest: request.id,
      idProduct: product.id,
      amount: 2
    })

    expect(ordernedProduct?.id).toEqual(expect.any(String))
    expect(ordernedProduct.request_id).toEqual(request.id)
    expect(ordernedProduct.product_id).toEqual(product.id)
    expect(ordernedProduct.amount).toEqual(2)
  })
})