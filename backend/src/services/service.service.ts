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

export async function createServiceService(
  clerkUserId: string,
  data: { name: string; durationMinutes: number; price: number }
) {
  const establishment = await getUserEstablishment(clerkUserId);

  return prisma.service.create({
    data: {
      name: data.name,
      durationMinutes: data.durationMinutes,
      price: data.price,
      establishmentId: establishment.id,
    },
  });
}

export async function getServicesService(clerkUserId: string) {
  const establishment = await getUserEstablishment(clerkUserId);

  return prisma.service.findMany({
    where: { establishmentId: establishment.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateServiceService(
  clerkUserId: string,
  id: string,
  data: { name?: string; durationMinutes?: number; price?: number }
) {
  const establishment = await getUserEstablishment(clerkUserId);

  const service = await prisma.service.findFirst({
    where: {
      id,
      establishmentId: establishment.id,
    },
  });

  if (!service) {
    throw new Error("Serviço não encontrado.");
  }

  return prisma.service.update({
    where: { id },
    data,
  });
}

export async function deleteServiceService(clerkUserId: string, id: string) {
  const establishment = await getUserEstablishment(clerkUserId);

  const service = await prisma.service.findFirst({
    where: {
      id,
      establishmentId: establishment.id,
    },
  });

  if (!service) {
    throw new Error("Serviço não encontrado.");
  }

  await prisma.service.delete({
    where: { id },
  });
}