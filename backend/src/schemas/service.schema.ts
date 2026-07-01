import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  durationMinutes: z.number().int().positive("A duração deve ser positiva."),
  price: z.number().positive("O preço deve ser positivo."),
});

export const updateServiceSchema = createServiceSchema.partial();