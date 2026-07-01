import { Request, Response } from "express";
import { getAvailableSlotsService } from "../services/availability.service";
import { getAvailableSlotsSchema } from "../schemas/availability.schema";

export async function getAvailableSlots(req: Request, res: Response) {
  try {
    const professionalId = req.params.professionalId as string;
    const { date, serviceId } =
        getAvailableSlotsSchema.parse(req.query);

    if (!date || !serviceId) {
      return res.status(400).json({
        message: "Informe date e serviceId.",
      });
    }

    const slots = await getAvailableSlotsService(
      professionalId,
      date,
      serviceId
    );

    return res.json({
      professionalId,
      date,
      serviceId,
      availableSlots: slots,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao buscar horários disponíveis.",
    });
  }
}