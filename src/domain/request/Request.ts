import { TRequestStatus } from "./TRequestStatus";

class Request {
  public id: string = "";
  public account_id: string;
  public status: string
  public created_at: Date

  constructor(account_Id: string, status: TRequestStatus, created_at: Date, id?: string) {
    this.account_id = account_Id;
    this.status = status;
    this.created_at = created_at;

    if (id) {
      this.id = id;
    }
  }
}

export { Request }