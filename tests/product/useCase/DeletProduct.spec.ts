import { CreateAccount } from "@/app/account/create/CreateAccount";
import { CreateProduct } from "@/app/product/create/CreateProduct";
import { DeleteProduct } from "@/app/product/delete/DeleteProduct";
import { ProductIsNotAccount } from "@/domain/product/ProductIsNotAccount";
import { ProductNotFound } from "@/domain/product/ProductNotFound";
import { AccountRepositoryInMemory } from "@/infra/repositories/account/AccountRepositoryInMemory";
import { ProductRepositoryInMemory } from "@/infra/repositories/product/ProductRepositoryInMemory";
import { beforeEach, describe, expect, it } from "vitest";

let productRepository: ProductRepositoryInMemory;
let accountRepository: AccountRepositoryInMemory;
let createProduct: CreateProduct;
let deleteProduct: DeleteProduct;
let createAccount: CreateAccount;

describe("Delete Product", () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
    accountRepository = new AccountRepositoryInMemory();
    createAccount = new CreateAccount(accountRepository);
    deleteProduct = new DeleteProduct(productRepository);
    createProduct = new CreateProduct(productRepository, accountRepository);
  })

  it("Should be able to delete a product", async () => {
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

    await deleteProduct.execute(account.id as string, product.id);

    const isDeleted = await productRepository.findById(product.id);

    expect(isDeleted).toBe(null);
  })

  it("Should not be able to delete if the product does not exist", async () => {
    const account = await createAccount.execute({
      name: "Giovani Coelho",
      email: "giovanicoelho@hotmail.com",
      password: "123456"
    })

    expect(async () => {
      await deleteProduct.execute(account.id as string, "111");
    }).rejects.toThrow(ProductNotFound);
  })

  it("Should not be able to delete if the account_id does not exist", async () => {
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

    expect(async () => {
      await deleteProduct.execute("hahaha" as string, product.id);
    }).rejects.toThrow(ProductIsNotAccount);
  })
})