import { z } from "zod";

export const getAvailableSlotsSchema = z.object({
  date: z.string().date(),
  serviceId: z.string().uuid(),
});