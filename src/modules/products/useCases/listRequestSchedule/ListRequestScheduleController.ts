import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRequestScheduleUseCase } from "./ListRequestScheduleUseCase";

class ListRequestScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const listRequestScheduleUseCase = container.resolve(
            ListRequestScheduleUseCase
        );

        const listRequestSchedules = await listRequestScheduleUseCase.execute({
            id,
        });

        return response.status(200).send(listRequestSchedules);
    }
}

export { ListRequestScheduleController };
