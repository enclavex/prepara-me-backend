import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecialistScheduleUseCase } from "./ListSpecialistScheduleUseCase";

class ListSpecialistScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        let { dateBegin, dateEnd, specialistId, userId, status, productId } =
            request.query;
            
        const listScheduleSpecialistUseCase = container.resolve(
            ListSpecialistScheduleUseCase
        );

        const listScheduleSpecialist =
            await listScheduleSpecialistUseCase.execute({
                dateBegin,
                dateEnd,
                userId,
                status,
                productId,
                specialistId,
                id,
            });

        return response.status(201).json(listScheduleSpecialist);
    }
}

export { ListSpecialistScheduleController };

