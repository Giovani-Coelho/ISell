import { OrderedProductFactory } from "@/domain/orderedProduct/OrderedProductFactory";
import { beforeEach, describe, expect, it } from "vitest";

let orderedProductFactory: OrderedProductFactory

describe("Create a Ordered Product", () => {
  beforeEach(() => {
    orderedProductFactory = new OrderedProductFactory();
  })

  it("Should be able to order the Product", () => {
    const orderedProduct = orderedProductFactory.orderedProductData({
      idRequest: "1234",
      idProduct: "4321",
      amount: 2
    }).create();

    expect(orderedProduct?.idRequest).toBe("1234");
    expect(orderedProduct?.idProduct).toBe("4321");
    expect(orderedProduct?.amount).toBe(2);
  })
})