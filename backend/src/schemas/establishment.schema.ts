import { z } from "zod";

export const createEstablishmentSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  slug: z
    .string()
    .min(3)
    .regex(
      /^[a-z0-9-]+$/,
      "O slug deve conter apenas letras minúsculas, números e hífen."
    ),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  photoUrl: z.string().url("URL da foto inválida.").optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const updateEstablishmentSchema = createEstablishmentSchema.partial();