import { Request, Response } from "express";
import {
  createServiceSchema,
  updateServiceSchema,
} from "../schemas/service.schema";
import {
  createServiceService,
  getServicesService,
  updateServiceService,
  deleteServiceService,
} from "../services/service.service";

export async function createService(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;

    const data = createServiceSchema.parse(req.body);

    const service = await createServiceService(clerkUserId, data);

    return res.status(201).json(service);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao criar serviço.",
    });
  }
}

export async function getServices(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;

    const services = await getServicesService(clerkUserId);

    return res.json(services);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao buscar serviços.",
    });
  }
}

export async function updateService(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;
    const id = req.params.id as string;

    const data = updateServiceSchema.parse(req.body);

    const service = await updateServiceService(clerkUserId, id, data);

    return res.json(service);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao atualizar serviço.",
    });
  }
}

export async function deleteService(req: Request, res: Response) {
  try {
    const clerkUserId = req.clerkUserId!;
    const id = req.params.id as string;

    await deleteServiceService(clerkUserId, id);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Erro ao deletar serviço.",
    });
  }
}