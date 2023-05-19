export class InvalidStatus extends Error {
  constructor() {
    super("Invalid request status!");
  }
}