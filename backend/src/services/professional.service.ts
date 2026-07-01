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

export async function createProfessionalService(
  clerkUserId: string,
  data: {
     name: string;
     email?: string;
     description?: string;
     avatarUrl?: string;
     isActive?: boolean;
    }
) {
  const establishment = await getUserEstablishment(clerkUserId);

  return prisma.professional.create({
    data: {
      name: data.name,
      email: data.email,
      description: data.description,
      avatarUrl: data.avatarUrl,
      isActive: data.isActive,
      establishmentId: establishment.id,
    },
  });
}

export async function getProfessionalsService(clerkUserId: string) {
  const establishment = await getUserEstablishment(clerkUserId);

  return prisma.professional.findMany({
    where: { establishmentId: establishment.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateProfessionalService(
  clerkUserId: string,
  id: string,
  data: {
     name?: string; 
     email?: string;
     description?: string;
     avatarUrl?: string;
     isActive?: boolean;
    }
) {
  const establishment = await getUserEstablishment(clerkUserId);

  const professional = await prisma.professional.findFirst({
    where: {
      id,
      establishmentId: establishment.id,
    },
  });

  if (!professional) {
    throw new Error("Profissional não encontrado.");
  }

  return prisma.professional.update({
    where: { id },
    data,
  });
}

export async function deleteProfessionalService(
  clerkUserId: string,
  id: string
) {
  const establishment = await getUserEstablishment(clerkUserId);

  const professional = await prisma.professional.findFirst({
    where: {
      id,
      establishmentId: establishment.id,
    },
  });

  if (!professional) {
    throw new Error("Profissional não encontrado.");
  }

  await prisma.professional.delete({
    where: { id },
  });
}