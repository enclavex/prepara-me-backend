import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecialistUseCase } from "./ListSpecialistUseCase";

class ListSpecialistController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, status, userId } = request.query;

        const { id } = request.params;

        const listSpecialistUseCase = container.resolve(ListSpecialistUseCase);

        const listSpecialist = await listSpecialistUseCase.execute({
            name,
            status,
            userId,
            id,
        });

        return response.status(201).json(listSpecialist);
    }
}

export { ListSpecialistController }; 

