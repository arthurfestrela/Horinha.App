import { z } from "zod";

export const createProfessionalScheduleSchema = z.object({
  weekDay: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  breakStart: z.string().optional(),
  breakEnd: z.string().optional(),
  isDayOff: z.boolean().optional(),
});

export const updateProfessionalScheduleSchema =
  createProfessionalScheduleSchema.partial();