import { Request, Response } from "express";
import {
  createProfessionalScheduleService,
  getProfessionalSchedulesService,
} from "../services/professional-schedule.service";
import {
  createProfessionalScheduleSchema,
} from "../schemas/professional-schedule.schema";

export async function createProfessionalSchedule(req: Request, res: Response) {
  try {
    const professionalId = req.params.professionalId as string;
    const data = createProfessionalScheduleSchema.parse(req.body);

    const schedule = await createProfessionalScheduleService(
      req.clerkUserId!,
      professionalId,
      data
    );

    return res.status(201).json(schedule);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao criar horário do profissional.",
    });
  }
}

export async function getProfessionalSchedules(req: Request, res: Response) {
  try {
    const professionalId = req.params.professionalId as string;

    const schedules = await getProfessionalSchedulesService(
      req.clerkUserId!,
      professionalId
    );

    return res.json(schedules);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao buscar horários do profissional.",
    });
  }
}