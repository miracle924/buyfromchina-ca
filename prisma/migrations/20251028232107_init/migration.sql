-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "QuoteAudit" DROP CONSTRAINT "QuoteAudit_quoteId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteAudit" ADD CONSTRAINT "QuoteAudit_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
