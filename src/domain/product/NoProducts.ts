export class NoProducts extends Error {
  constructor() {
    super("You don't have any products yet")
  }
}