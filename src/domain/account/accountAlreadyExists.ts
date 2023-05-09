export class AccountAlreadyExists extends Error {
  constructor() {
    super("Email already exists")
  }
}