/*
  Warnings:

  - Made the column `professionalId` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_professionalId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "clientPhone" TEXT,
ALTER COLUMN "clientEmail" DROP NOT NULL,
ALTER COLUMN "professionalId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
