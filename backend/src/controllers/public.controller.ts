import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function getPublicEstablishment(req: Request, res: Response) {
  const slug = req.params.slug as string;

  const establishment = await prisma.establishment.findUnique({
    where: {
      slug,
    },
    include: {
      services: true,
      professionals: true,
    },
  });

  if (!establishment) {
    return res.status(404).json({
      message: "Estabelecimento não encontrado.",
    });
  }

  return res.json(establishment);
}

export async function createPublicAppointment(req: Request, res: Response) {
  const slug = req.params.slug as string;

  const {
    clientName,
    clientEmail,
    date,
    serviceId,
    professionalId,
  } = req.body;

  const establishment = await prisma.establishment.findUnique({
    where: {
      slug,
    },
  });

  if (!establishment) {
    return res.status(404).json({
      message: "Estabelecimento não encontrado.",
    });
  }

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      establishmentId: establishment.id,
    },
  });

  if (!service) {
    return res.status(404).json({
      message: "Serviço não encontrado.",
    });
  }

  if (professionalId) {
    const professional = await prisma.professional.findFirst({
      where: {
        id: professionalId,
        establishmentId: establishment.id,
      },
    });

    if (!professional) {
      return res.status(404).json({
        message: "Profissional não encontrado.",
      });
    }
  }

  const appointmentDate = new Date(date);

  const conflictingAppointment = await prisma.appointment.findFirst({
    where: {
      establishmentId: establishment.id,
      professionalId,
      date: appointmentDate,
      status: "CONFIRMED",
    },
  });

  if (conflictingAppointment) {
    return res.status(400).json({
      message: "Este horário já está ocupado.",
    });
  }

  const appointment = await prisma.appointment.create({
    data: {
      clientName,
      clientEmail,
      date: appointmentDate,
      establishmentId: establishment.id,
      serviceId,
      professionalId,
    },
  });

  return res.status(201).json(appointment);
}

export async function getAvailability(req: Request, res: Response) {
  const slug = req.params.slug as string;
  const { date, serviceId, professionalId } = req.query;

  if (!date || !serviceId) {
    return res.status(400).json({
      message: "Data e serviço são obrigatórios.",
    });
  }

  const establishment = await prisma.establishment.findUnique({
    where: { slug },
  });

  if (!establishment) {
    return res.status(404).json({
      message: "Estabelecimento não encontrado.",
    });
  }

  const service = await prisma.service.findFirst({
    where: {
      id: String(serviceId),
      establishmentId: establishment.id,
    },
  });

  if (!service) {
    return res.status(404).json({
      message: "Serviço não encontrado.",
    });
  }

  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59`);

  const selectedDate = new Date(`${date}T00:00:00`);
  const weekDay = selectedDate.getDay();

  if (weekDay === 0 || weekDay === 6) {
    return res.json({
        date,
        availableTimes: [],
        message: "O estabelecimento não funciona aos finais de semana.",
    });
 }

  const appointments = await prisma.appointment.findMany({
    where: {
      establishmentId: establishment.id,
      professionalId: professionalId ? String(professionalId) : undefined,
      status: "CONFIRMED",
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const openingHour = 9;
  const closingHour = 18;
  const intervalMinutes = 30;

  const availableTimes: string[] = [];

  const now = new Date();

  for (let hour = openingHour; hour < closingHour; hour++) {
  for (let minute = 0; minute < 60; minute += intervalMinutes) {

    if (hour === 12) {
      continue;
    }

    const slot = new Date(
      `${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`
    );

    if (
      slot.toDateString() === now.toDateString() &&
      slot <= now
    ) {
      continue;
    }

    const slotEnd = new Date(
      slot.getTime() + service.durationMinutes * 60000
    );

    const closingTime = new Date(`${date}T18:00:00`);

    if (slotEnd > closingTime) {
      continue;
    }

      const hasConflict = appointments.some((appointment) => {
        const appointmentStart = appointment.date;
        const appointmentEnd = new Date(
          appointmentStart.getTime() + service.durationMinutes * 60 * 1000
        );

        return slot < appointmentEnd && slotEnd > appointmentStart;
      });

      if (!hasConflict) {
        availableTimes.push(
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        );
      }
    }
  }

  return res.json({
    date,
    serviceId,
    professionalId: professionalId || null,
    availableTimes,
  });
}