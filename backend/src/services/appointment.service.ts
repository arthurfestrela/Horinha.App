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

export async function createAppointmentService(
  clerkUserId: string,
  data: {
    clientName: string;
    clientEmail: string;
    date: string;
    serviceId: string;
    professionalId?: string;
  }
) {
  const establishment = await getUserEstablishment(clerkUserId);

  const service = await prisma.service.findFirst({
    where: {
      id: data.serviceId,
      establishmentId: establishment.id,
    },
  });

  if (!service) {
    throw new Error("Serviço não encontrado.");
  }

  if (data.professionalId) {
    const professional = await prisma.professional.findFirst({
      where: {
        id: data.professionalId,
        establishmentId: establishment.id,
      },
    });

    if (!professional) {
      throw new Error("Profissional não encontrado.");
    }
  }

  const appointmentDate = new Date(data.date);

  const conflict = await prisma.appointment.findFirst({
    where: {
      establishmentId: establishment.id,
      professionalId: data.professionalId,
      date: appointmentDate,
      status: "CONFIRMED",
    },
  });

  if (conflict) {
    throw new Error("Este horário já está ocupado.");
  }

  return prisma.appointment.create({
    data: {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      date: appointmentDate,
      establishmentId: establishment.id,
      serviceId: data.serviceId,
      professionalId: data.professionalId,
    },
  });
}

export async function getAppointmentsService(clerkUserId: string) {
  const establishment = await getUserEstablishment(clerkUserId);

  return prisma.appointment.findMany({
    where: {
      establishmentId: establishment.id,
    },
    include: {
      service: true,
      professional: true,
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function updateAppointmentService(
  clerkUserId: string,
  id: string,
  data: {
    clientName?: string;
    clientEmail?: string;
    date?: string;
    serviceId?: string;
    professionalId?: string;
    status?: "CONFIRMED" | "CANCELED" | "FINISHED";
  }
) {
  const establishment = await getUserEstablishment(clerkUserId);

  const appointment = await prisma.appointment.findFirst({
    where: {
      id,
      establishmentId: establishment.id,
    },
  });

  if (!appointment) {
    throw new Error("Agendamento não encontrado.");
  }

  const updateData = {
    ...data,
    date: data.date ? new Date(data.date) : undefined,
  };

  return prisma.appointment.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteAppointmentService(clerkUserId: string, id: string) {
  const establishment = await getUserEstablishment(clerkUserId);

  const appointment = await prisma.appointment.findFirst({
    where: {
      id,
      establishmentId: establishment.id,
    },
  });

  if (!appointment) {
    throw new Error("Agendamento não encontrado.");
  }

  await prisma.appointment.delete({
    where: { id },
  });
}