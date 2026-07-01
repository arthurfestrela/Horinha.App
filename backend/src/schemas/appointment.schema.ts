import { z } from "zod";

export const createAppointmentSchema = z.object({
  clientName: z.string().min(3, "O nome do cliente deve ter pelo menos 3 caracteres."),
  clientEmail: z.string().email("E-mail inválido."),
  date: z.string().datetime("Data inválida."),
  serviceId: z.string().uuid("Serviço inválido."),
  professionalId: z.string().uuid("Profissional inválido.").optional(),
});

export const updateAppointmentSchema = z.object({
  clientName: z.string().min(3).optional(),
  clientEmail: z.string().email().optional(),
  date: z.string().datetime().optional(),
  serviceId: z.string().uuid().optional(),
  professionalId: z.string().uuid().optional(),
  status: z.enum(["CONFIRMED", "CANCELED", "FINISHED"]).optional(),
});