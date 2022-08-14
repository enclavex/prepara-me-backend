import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecialistScheduleUseCase } from "./CreateSpecialistScheduleUseCase";

class CreateSpecialistScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            dateSchedule,
            status,
            specialistId,
            productId,
            userId,
            comments,
            hangoutLink,
            scheduleEventId,
            createEvent
        } = request.body;

        const { id } = request.params;

        const createSpecialistScheduleUseCase = container.resolve(
            CreateSpecialistScheduleUseCase
        );

        const specialistSchedule =
            await createSpecialistScheduleUseCase.execute({
                dateSchedule,
                specialistId,
                status,
                productId,
                userId,
                comments,
                hangoutLink,
                scheduleEventId,
                id,
                createEvent
            });

        return response.status(201).json(specialistSchedule);
    }
}

export { CreateSpecialistScheduleController };

