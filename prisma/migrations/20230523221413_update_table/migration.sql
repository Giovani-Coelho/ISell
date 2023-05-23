/*
  Warnings:

  - You are about to drop the `OrderedProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderedProduct" DROP CONSTRAINT "OrderedProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderedProduct" DROP CONSTRAINT "OrderedProduct_request_id_fkey";

-- DropTable
DROP TABLE "OrderedProduct";

-- CreateTable
CREATE TABLE "orderedProduct" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orderedProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderedProduct" ADD CONSTRAINT "orderedProduct_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderedProduct" ADD CONSTRAINT "orderedProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
