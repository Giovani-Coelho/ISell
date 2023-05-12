import { ProductFactory } from "@/domain/product/ProductFactory"
import { beforeEach, describe, expect, it } from "vitest"

let productFactory: ProductFactory

describe("Create Product", () => {
  beforeEach(() => {
    productFactory = new ProductFactory();
  })

  it("Should be able create a new product", () => {
    const product = productFactory.productData({
      name: "celular",
      price: 12222,
      description: "",
      available: true,
      account_id: "5f9888bb-79cd-4d90-892d-681ce1a4b9cd"
    }).create()

    expect(product).toHaveProperty("id")
    expect(product).toHaveProperty("name", "celular")
  })
})