import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRequestScheduleUseCase } from "./CreateRequestScheduleUseCase";

class CreateRequestScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, name, obs, id } = request.body;

        const createRequestScheduleUseCase = container.resolve(
            CreateRequestScheduleUseCase
        );

        const requestSchedule = await createRequestScheduleUseCase.execute({
            email,
            name,
            obs,
            id,
        });

        return response.status(201).send(requestSchedule)
    }
}

export { CreateRequestScheduleController };
