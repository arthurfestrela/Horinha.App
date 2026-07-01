import { Request, Response } from "express";
import {
  createScheduleBlockService,
  getScheduleBlocksService,
} from "../services/schedule-block.service";
import { createScheduleBlockSchema } from "../schemas/schedule-block.schema";

export async function createScheduleBlock(req: Request, res: Response) {
  try {
    const professionalId = req.params.professionalId as string;
    const data = createScheduleBlockSchema.parse(req.body);

    const block = await createScheduleBlockService(
      req.clerkUserId!,
      professionalId,
      data
    );

    return res.status(201).json(block);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao criar bloqueio de agenda.",
    });
  }
}

export async function getScheduleBlocks(req: Request, res: Response) {
  try {
    const professionalId = req.params.professionalId as string;

    const blocks = await getScheduleBlocksService(
      req.clerkUserId!,
      professionalId
    );

    return res.json(blocks);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao buscar bloqueios de agenda.",
    });
  }
}