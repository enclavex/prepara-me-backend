import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveSpecialistScheduleUseCase } from "./RemoveSpecialistScheduleUseCase";

class RemoveSpecialistScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeSpecialistScheduleUseCase = container.resolve(
            RemoveSpecialistScheduleUseCase
        );

        await removeSpecialistScheduleUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveSpecialistScheduleController };

