-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[];
