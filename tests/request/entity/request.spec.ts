import { ProductFactory } from "@/domain/product/ProductFactory"
import { RequestFactory } from "@/domain/request/RequestFactory"
import { beforeEach, describe, expect, it } from "vitest"

let requestFactory: RequestFactory

describe("Create Product", () => {
  beforeEach(() => {
    requestFactory = new RequestFactory();
  })

  it("Should be able create a new product", () => {
    const req = requestFactory.productData({
      account_id: "123456",
      status: "in progress"
    }).create()

    expect(req).toHaveProperty("id")
    expect(req).toHaveProperty("status", "in progress")
  })
})