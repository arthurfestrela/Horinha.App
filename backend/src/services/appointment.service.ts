import { prisma } from "../lib/prisma";
import { AppointmentStatus } from "@prisma/client";

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function dateToTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getWeekDay(date: Date) {
  const weekDays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return weekDays[date.getDay()];
}

export async function createAppointmentService(data: {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  professionalId: string;
  serviceId: string;
  date: Date;
}) {
  const professional = await prisma.professional.findUnique({
    where: { id: data.professionalId },
    include: {
      establishment: true,
      schedules: true,
    },
  });

  if (!professional) {
    throw new Error("Profissional não encontrado.");
  }

  const service = await prisma.service.findFirst({
    where: {
      id: data.serviceId,
      establishmentId: professional.establishmentId,
    },
  });

  if (!service) {
    throw new Error("Serviço não encontrado para este estabelecimento.");
  }

  const weekDay = getWeekDay(data.date);

  const schedule = professional.schedules.find(
    (item) => item.weekDay === weekDay
  );

  if (!schedule || schedule.isDayOff) {
    throw new Error("Profissional não atende neste dia.");
  }

  const appointmentTime = timeToMinutes(dateToTime(data.date));
  const start = timeToMinutes(schedule.startTime);
  const end = timeToMinutes(schedule.endTime);
  const duration = Number(service.durationMinutes);
  const appointmentEnd = appointmentTime + duration;

  if (appointmentTime < start || appointmentEnd > end) {
    throw new Error("Horário fora do expediente do profissional.");
  }

  if (schedule.breakStart && schedule.breakEnd) {
    const breakStart = timeToMinutes(schedule.breakStart);
    const breakEnd = timeToMinutes(schedule.breakEnd);

    const overlapsBreak =
      appointmentTime < breakEnd && appointmentEnd > breakStart;

    if (overlapsBreak) {
      throw new Error("Horário dentro do intervalo do profissional.");
    }
  }

  const startOfDay = new Date(data.date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(data.date);
  endOfDay.setHours(23, 59, 59, 999);

  const blocks = await prisma.scheduleBlock.findMany({
    where: {
      professionalId: data.professionalId,
      startDate: {
        lte: data.date,
      },
      endDate: {
        gte: data.date,
      },
    },
  });

  if (blocks.length > 0) {
    throw new Error("Profissional indisponível neste horário.");
  }

  const conflictingAppointment = await prisma.appointment.findFirst({
    where: {
      professionalId: data.professionalId,
      status: {
        not: "CANCELED",
      },
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      service: true,
    },
  });

  if (conflictingAppointment) {
    const existingStart = timeToMinutes(dateToTime(conflictingAppointment.date));
    const existingDuration = Number(conflictingAppointment.service.durationMinutes);
    const existingEnd = existingStart + existingDuration;

    const hasConflict =
      appointmentTime < existingEnd && appointmentEnd > existingStart;

    if (hasConflict) {
      throw new Error("Este horário já está ocupado.");
    }
  }

  return prisma.appointment.create({
    data: {
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      date: data.date,
      status: "CONFIRMED",
      professionalId: data.professionalId,
      serviceId: data.serviceId,
      establishmentId: professional.establishmentId,
    },
  });
}

export async function getAppointmentsService() {
  return prisma.appointment.findMany({
    include: {
      service: true,
      professional: true,
      establishment: true,
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function cancelAppointmentService(id: string) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) {
    throw new Error("Agendamento não encontrado.");
  }

  return prisma.appointment.update({
    where: { id },
    data: {
      status: "CANCELED",
    },
  });
}

export async function updateAppointmentStatusService(
  id: string,
  status: AppointmentStatus
) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) {
    throw new Error("Agendamento não encontrado.");
  }

  return prisma.appointment.update({
    where: { id },
    data: { status },
  });
}