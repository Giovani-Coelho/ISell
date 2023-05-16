import { CreateProduct } from "@/app/product/create/CreateProduct"
import { ProductRepositoryInMemory } from "@/infra/repositories/product/ProductRepositoryInMemory"
import { beforeEach, describe, expect, it } from "vitest"

let productRepository: ProductRepositoryInMemory
let createProduct: CreateProduct

describe("Create Product UseCase", () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory()
    createProduct = new CreateProduct(productRepository)
  })

  it("Should be able create a Product", async () => {
    const product = await createProduct.execute({
      name: "lapis",
      price: 1.90,
      description: "",
      available: true,
      account_id: "5123151"
    })

    expect(product.id).toEqual(expect.any(String))
  })
})