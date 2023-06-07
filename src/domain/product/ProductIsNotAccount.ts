class ProductIsNotAccount extends Error {
  constructor() {
    super("This product does not belong to this user!")
  }
}

export { ProductIsNotAccount };