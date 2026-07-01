import { prisma } from "../lib/prisma";

async function getUserEstablishment(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    include: { establishment: true },
  });

  if (!user?.establishment) {
    throw new Error("Estabelecimento não encontrado.");
  }

  return user.establishment;
}

export async function createProfessionalScheduleService(
  clerkUserId: string,
  professionalId: string,
  data: {
    weekDay: string;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
    isDayOff?: boolean;
  }
) {
  const establishment = await getUserEstablishment(clerkUserId);

  const professional = await prisma.professional.findFirst({
    where: {
      id: professionalId,
      establishmentId: establishment.id,
    },
  });

  if (!professional) {
    throw new Error("Profissional não encontrado.");
  }

  return prisma.professionalSchedule.create({
    data: {
      weekDay: data.weekDay,
      startTime: data.startTime,
      endTime: data.endTime,
      breakStart: data.breakStart,
      breakEnd: data.breakEnd,
      isDayOff: data.isDayOff ?? false,
      professionalId,
    },
  });
}

export async function getProfessionalSchedulesService(
  clerkUserId: string,
  professionalId: string
) {
  const establishment = await getUserEstablishment(clerkUserId);

  const professional = await prisma.professional.findFirst({
    where: {
      id: professionalId,
      establishmentId: establishment.id,
    },
  });

  if (!professional) {
    throw new Error("Profissional não encontrado.");
  }

  return prisma.professionalSchedule.findMany({
    where: { professionalId },
    orderBy: { weekDay: "asc" },
  });
}