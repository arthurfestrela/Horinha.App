import { z } from "zod";

export const createAppointmentSchema = z.object({
  clientName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  clientEmail: z.string().email("E-mail inválido.").optional(),
  clientPhone: z.string().optional(),

  professionalId: z.string().uuid(),
  serviceId: z.string().uuid(),

  date: z.coerce.date(),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELED", "COMPLETED"]),
});