-- CreateTable
CREATE TABLE "ProfessionalSchedule" (
    "id" TEXT NOT NULL,
    "weekDay" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "breakStart" TEXT,
    "breakEnd" TEXT,
    "isDayOff" BOOLEAN NOT NULL DEFAULT false,
    "professionalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalSchedule" ADD CONSTRAINT "ProfessionalSchedule_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
