import { prisma } from "../lib/prisma";

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
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

export async function getAvailableSlotsService(
  professionalId: string,
  date: string,
  serviceId: string
) {
  const selectedDate = new Date(`${date}T12:00:00`);
  const weekDay = getWeekDay(selectedDate);

  const professional = await prisma.professional.findUnique({
    where: { id: professionalId },
    include: {
      schedules: true,
      establishment: true,
    },
  });

  if (!professional) {
    throw new Error("Profissional não encontrado.");
  }

  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      establishmentId: professional.establishmentId,
    },
  });

  if (!service) {
    throw new Error("Serviço não encontrado para este estabelecimento.");
  }

  const schedule = professional.schedules.find(
    (item) => item.weekDay === weekDay
  );

  if (!schedule || schedule.isDayOff) {
    return [];
  }

  const start = timeToMinutes(schedule.startTime);
  const end = timeToMinutes(schedule.endTime);
  const duration = Number(service.durationMinutes);

  if (!duration || duration <= 0) {
    throw new Error("Duração do serviço inválida.");
  }

  const breakStart = schedule.breakStart
    ? timeToMinutes(schedule.breakStart)
    : null;

  const breakEnd = schedule.breakEnd ? timeToMinutes(schedule.breakEnd) : null;

  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59`);

  const appointments = await prisma.appointment.findMany({
    where: {
      professionalId,
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

  const blocks = await prisma.scheduleBlock.findMany({
    where: {
      professionalId,
      startDate: {
        lte: endOfDay,
      },
      endDate: {
        gte: startOfDay,
      },
    },
  });

  const slots: string[] = [];

  for (let current = start; current + duration <= end; current += duration) {
    const slotEnd = current + duration;

    const overlapsBreak =
      breakStart !== null &&
      breakEnd !== null &&
      current < breakEnd &&
      slotEnd > breakStart;

    if (overlapsBreak) {
      continue;
    }

    const overlapsAppointment = appointments.some((appointment) => {
      const appointmentStart = timeToMinutes(dateToTime(appointment.date));
      const appointmentDuration = Number(appointment.service.durationMinutes);
      const appointmentEnd = appointmentStart + appointmentDuration;

      return current < appointmentEnd && slotEnd > appointmentStart;
    });

    if (overlapsAppointment) {
      continue;
    }

    const overlapsBlock = blocks.some((block) => {
      const blockStart = timeToMinutes(dateToTime(block.startDate));
      const blockEnd = timeToMinutes(dateToTime(block.endDate));

      return current < blockEnd && slotEnd > blockStart;
    });

    if (overlapsBlock) {
      continue;
    }

    slots.push(minutesToTime(current));
  }

  return slots;
}