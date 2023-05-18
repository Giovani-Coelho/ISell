import { CreateProduct } from "@/app/product/create/CreateProduct"
import { ListAllProducts } from "@/app/product/listAll/ListAllProducts"
import { ProductRepositoryInMemory } from "@/infra/repositories/product/ProductRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let productsRepository: ProductRepositoryInMemory
let createProduct: CreateProduct
let listAllProducts: ListAllProducts

describe("List all Product UseCase", () => {
  beforeEach(() => {
    productsRepository = new ProductRepositoryInMemory();
    createProduct = new CreateProduct(productsRepository);
    listAllProducts = new ListAllProducts(productsRepository)
  })

  it("should be able to list all products!", async () => {
    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 5,
      description: "2",
      available: true,
      account_id: "account_id"
    })

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 5,
      description: "2",
      available: true,
      account_id: "account_id"
    })

    await createProduct.execute({
      name: "lapis",
      price: 1.90,
      amount: 5,
      description: "2",
      available: true,
      account_id: "account_id"
    })

    const products = await listAllProducts.execute("1");

    expect(products.length).toEqual(3);
  })
})