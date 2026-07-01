import { prisma } from "../lib/prisma";

async function getUser(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
}

export async function createEstablishmentService(
  clerkUserId: string,
  data: {
    name: string;
    slug: string;
    description?: string;
    address?: string;
    phone?: string;
    photoUrl?: string;
    city?: string;
    state?: string;
    district?: string;
    latitude?: number;
    longitude?: number;
    openingTime?: string;
    closingTime?: string;
    breakStart?: string;
    breakEnd?: string;
    workingDays?: string;
    }
) {
  const user = await getUser(clerkUserId);

  const establishmentAlreadyExists =
    await prisma.establishment.findUnique({
      where: {
        ownerId: user.id,
      },
    });

  if (establishmentAlreadyExists) {
    throw new Error("Este usuário já possui um estabelecimento.");
  }

  const slugAlreadyExists =
    await prisma.establishment.findUnique({
      where: {
        slug: data.slug,
      },
    });

  if (slugAlreadyExists) {
    throw new Error("Slug já está em uso.");
  }

  return prisma.establishment.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      address: data.address,
      phone: data.phone,
      photoUrl: data.photoUrl,
      city: data.city,
      state: data.state,
      district: data.district,
      latitude: data.latitude,
      longitude: data.longitude,
      openingTime: data.openingTime,
      closingTime: data.closingTime,
      breakStart: data.breakStart,
      breakEnd: data.breakEnd,
      workingDays: data.workingDays,
      ownerId: user.id,
    },
  });
}

export async function getEstablishmentService(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
    include: {
      establishment: true,
    },
  });

  if (!user?.establishment) {
    throw new Error("Estabelecimento não encontrado.");
  }

  return user.establishment;
}

export async function updateEstablishmentService(
  clerkUserId: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    address?: string;
    phone?: string;
    photoUrl?: string;
    city?: string;
    state?: string;
    district?: string;
    latitude?: number;
    longitude?: number;
    openingTime?: string;
    closingTime?: string;
    breakStart?: string;
    breakEnd?: string;
    workingDays?: string;
    }
) {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
    include: {
      establishment: true,
    },
  });

  if (!user?.establishment) {
    throw new Error("Estabelecimento não encontrado.");
  }

  return prisma.establishment.update({
    where: {
        id: user.establishment.id,
    },
    data,
});
}

export async function deleteEstablishmentService(clerkUserId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
    include: {
      establishment: true,
    },
  });

  if (!user?.establishment) {
    throw new Error("Estabelecimento não encontrado.");
  }

  await prisma.establishment.delete({
    where: {
      id: user.establishment.id,
    },
  });
}