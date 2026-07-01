import { z } from "zod";

export const createScheduleBlockSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const updateScheduleBlockSchema = createScheduleBlockSchema.partial();