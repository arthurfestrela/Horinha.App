import { Request, Response } from "express";
import {
  createAppointmentService,
  getAppointmentsService,
  updateAppointmentService,
  deleteAppointmentService,
} from "../services/appointment.service";
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../schemas/appointment.schema";

export async function createAppointment(req: Request, res: Response) {
  try {
    const data = createAppointmentSchema.parse(req.body);

    const appointment = await createAppointmentService(
      req.clerkUserId!,
      data
    );

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao criar agendamento.",
    });
  }
}

export async function getAppointments(req: Request, res: Response) {
  try {
    const appointments = await getAppointmentsService(req.clerkUserId!);

    return res.json(appointments);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao buscar agendamentos.",
    });
  }
}

export async function updateAppointment(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const data = updateAppointmentSchema.parse(req.body);

    const appointment = await updateAppointmentService(
      req.clerkUserId!,
      id,
      data
    );

    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao atualizar agendamento.",
    });
  }
}

export async function deleteAppointment(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    await deleteAppointmentService(req.clerkUserId!, id);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao deletar agendamento.",
    });
  }
}