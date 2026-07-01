-- AlterTable
ALTER TABLE "Professional" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
