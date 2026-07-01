import { z } from "zod";

export const createProfessionalSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("E-mail inválido.").optional(),
  description: z.string().optional(),
  avatarUrl: z.string().url("URL da imagem inválida.").optional(),
  isActive: z.boolean().optional(),
});

export const updateProfessionalSchema = createProfessionalSchema.partial();