import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecialistScheduleUseCase } from "./ListSpecialistScheduleUseCase";

class ListSpecialistScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        let { dateBegin, dateEnd, specialistId, specialistUserId, userId, status, productId } =
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
                specialistUserId,
                id,
            });

        return response.status(201).json(listScheduleSpecialist);
    }
}

export { ListSpecialistScheduleController };

