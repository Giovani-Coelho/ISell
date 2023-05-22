-- CreateTable
CREATE TABLE "OrderedProduct" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderedProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
