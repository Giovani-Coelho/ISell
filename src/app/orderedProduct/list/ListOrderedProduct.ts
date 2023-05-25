import { IOrderedProductRepositoy } from "@/domain/orderedProduct/IOrderedProductRepository";
import { OrderedProduct } from "@/domain/orderedProduct/OrderedProduct";
import { IRequestRepository } from "@/domain/request/IRequestRepository";
import { RequestNotFound } from "@/domain/request/RequestNotFound";

class ListOrderedProduct {
  constructor(
    private orderedProductRepository: IOrderedProductRepositoy,
    private requestRepository: IRequestRepository
  ) { }

  public async execute(request_id: string): Promise<OrderedProduct[]> {
    const request = await this.requestRepository.findById(request_id);

    if (!request) {
      throw new RequestNotFound();
    }

    const productList = await this.orderedProductRepository.list(request_id);

    return productList;
  }
}

export { ListOrderedProduct }