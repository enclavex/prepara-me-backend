import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveSpecialistUseCase } from "./RemoveSpecialistUseCase";

class RemoveSpecialistController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeSpecialistUseCase = container.resolve(
            RemoveSpecialistUseCase
        );

        await removeSpecialistUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveSpecialistController };

