import { Request, Response } from "express";
import {
  createProfessionalSchema,
  updateProfessionalSchema,
} from "../schemas/professional.schema";
import {
  createProfessionalService,
  getProfessionalsService,
  updateProfessionalService,
  deleteProfessionalService,
} from "../services/professional.service";

export async function createProfessional(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;

    const data = createProfessionalSchema.parse(req.body);

    const professional = await createProfessionalService(clerkUserId, data);

    return res.status(201).json(professional);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao criar profissional.",
    });
  }
}

export async function getProfessionals(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;

    const professionals = await getProfessionalsService(clerkUserId);

    return res.json(professionals);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao buscar profissionais.",
    });
  }
}

export async function updateProfessional(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;
    const id = req.params.id as string;

    const data = updateProfessionalSchema.parse(req.body);

    const professional = await updateProfessionalService(
        clerkUserId,
        id,
        data
    );

    return res.json(professional);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao atualizar profissional.",
    });
  }
}

export async function deleteProfessional(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;
    const id = req.params.id as string;

    await deleteProfessionalService(clerkUserId, id);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao deletar profissional.",
    });
  }
}