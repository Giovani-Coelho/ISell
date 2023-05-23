
class OrderedProduct {

  public id: string = "";
  public request_id: string;
  public product_id: string;
  public amount: number;
  public created_at?: Date;

  constructor(request_id: string, product_id: string, amount: number, created_at?: Date, id?: string) {
    this.request_id = request_id;
    this.product_id = product_id;
    this.amount = amount;
    this.created_at = created_at;

    if (id) {
      this.id = id;
    }
  }
}

export { OrderedProduct }