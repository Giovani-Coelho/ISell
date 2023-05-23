
class OrderedProduct {

  public id: string = "";
  public idRequest: string;
  public idProduct: string;
  public amount: number;
  public created_at?: Date;

  constructor(idRequest: string, idProduct: string, amount: number, created_at?: Date, id?: string) {
    this.idRequest = idRequest;
    this.idProduct = idProduct;
    this.amount = amount;
    this.created_at = created_at;

    if (id) {
      this.id = id;
    }
  }
}

export { OrderedProduct }