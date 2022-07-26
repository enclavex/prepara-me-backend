import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProductSpecialistUseCase } from "./RemoveProductSpecialistUseCase";

class RemoveProductSpecialistController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeProductSpecialistUseCase = container.resolve(
            RemoveProductSpecialistUseCase
        );

        await removeProductSpecialistUseCase.execute(id);

        return response.status(200).send();
    } 
}

export { RemoveProductSpecialistController };

