class ProductNotFound extends Error {
  constructor() {
    super("Products Not Found!");
  }
}

export { ProductNotFound }