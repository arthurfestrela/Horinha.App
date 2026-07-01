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

async function getProfessionalFromEstablishment(
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

  return professional;
}

export async function createScheduleBlockService(
  clerkUserId: string,
  professionalId: string,
  data: {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
  }
) {
  await getProfessionalFromEstablishment(clerkUserId, professionalId);

  if (data.endDate <= data.startDate) {
    throw new Error("A data final deve ser maior que a data inicial.");
  }

  return prisma.scheduleBlock.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      professionalId,
    },
  });
}

export async function getScheduleBlocksService(
  clerkUserId: string,
  professionalId: string
) {
  await getProfessionalFromEstablishment(clerkUserId, professionalId);

  return prisma.scheduleBlock.findMany({
    where: {
      professionalId,
    },
    orderBy: {
      startDate: "asc",
    },
  });
}