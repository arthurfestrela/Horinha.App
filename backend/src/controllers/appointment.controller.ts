import { Request, Response } from "express";
import {
  cancelAppointmentService,
  createAppointmentService,
  getAppointmentsService,
  updateAppointmentStatusService,
} from "../services/appointment.service";
import {
  createAppointmentSchema,
  updateAppointmentStatusSchema,
} from "../schemas/appointment.schema";

function getParamId(req: Request): string {
  const id = req.params["id"];

  if (typeof id !== "string") {
    throw new Error("ID do agendamento não informado.");
  }

  return id;
}

export async function createAppointment(req: Request, res: Response) {
  try {
    const data = createAppointmentSchema.parse(req.body);
    const appointment = await createAppointmentService(data);

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error ? error.message : "Erro ao criar agendamento.",
    });
  }
}

export async function getAppointments(req: Request, res: Response) {
  try {
    const appointments = await getAppointmentsService();

    return res.json(appointments);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao listar agendamentos.",
    });
  }
}

export async function cancelAppointment(req: Request, res: Response) {
  try {
    const id = getParamId(req);

    const appointment = await cancelAppointmentService(id);

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao cancelar agendamento.",
    });
  }
}

export async function updateAppointmentStatus(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const { status } = updateAppointmentStatusSchema.parse(req.body);

    const appointment = await updateAppointmentStatusService(id, status);

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao atualizar status do agendamento.",
    });
  }
}