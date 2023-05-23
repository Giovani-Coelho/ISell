class RequestNotFound extends Error {
  constructor() {
    super("Request Not Found!")
  }
}

export { RequestNotFound }