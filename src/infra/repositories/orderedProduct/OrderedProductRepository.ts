import { IOrderedProductDTO } from "@/domain/orderedProduct/IOrderedProductDTO";
import { IOrderedProductRepositoy } from "@/domain/orderedProduct/IOrderedProductRepository";
import { OrderedProduct } from "@/domain/orderedProduct/OrderedProduct";
import { prisma } from "@/lib/prismaClient";


class OrderedProductRepository implements IOrderedProductRepositoy {
  public async create({ idRequest, idProduct, amount }: IOrderedProductDTO): Promise<OrderedProduct> {
    const orderedProduct = await prisma.orderedProduct.create({
      data: {
        request_id: idRequest,
        product_id: idProduct,
        amount
      }
    })

    return orderedProduct;
  }

  public async list(request_id: string): Promise<OrderedProduct[]> {
    const product = await prisma.orderedProduct.findMany({
      where: {
        request_id
      }
    })

    return product
  }
}

export { OrderedProductRepository }