import { IRequestDTO } from '@/domain/request/IRequestDTO';
import { Request } from "./Request";
import { v4 as uuid } from 'uuid';

class RequestFactory {
  public request: Request | undefined;

  public productData({ account_id, status }: IRequestDTO) {
    this.request = new Request(account_id, status, new Date(), uuid())
    return this;
  }

  public create() {
    return this.request;
  }
}

export { RequestFactory }