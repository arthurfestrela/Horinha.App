import { Request, Response } from "express";
import {
  createEstablishmentSchema,
  updateEstablishmentSchema,
} from "../schemas/establishment.schema";
import {
  createEstablishmentService,
  getEstablishmentService,
  updateEstablishmentService,
  deleteEstablishmentService,
} from "../services/establishment.service";

export async function createEstablishment(req: Request, res: Response) {
  try {
    const data = createEstablishmentSchema.parse(req.body);

    const establishment = await createEstablishmentService(
      req.clerkUserId!,
      data
    );

    return res.status(201).json(establishment);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao criar estabelecimento.",
    });
  }
}

export async function getMyEstablishment(req: Request, res: Response) {
  try {
    const establishment = await getEstablishmentService(req.clerkUserId!);

    return res.json(establishment);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao buscar estabelecimento.",
    });
  }
}

export async function updateEstablishment(req: Request, res: Response) {
  try {
    const data = updateEstablishmentSchema.parse(req.body);

    const establishment = await updateEstablishmentService(
        req.clerkUserId!,
        data
    );

    return res.json(establishment);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao atualizar estabelecimento.",
    });
  }
}

export async function deleteEstablishment(req: Request, res: Response) {
  try {
    await deleteEstablishmentService(req.clerkUserId!);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Erro ao deletar estabelecimento.",
    });
  }
}