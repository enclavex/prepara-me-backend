import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateSpecialistScheduleUseCase } from "./UpdateSpecialistScheduleUseCase";

class UpdateSpecialistScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { specialistScheduleId } = request.params;
        const userId = request.user.id;

        if (!specialistScheduleId) {
            throw new AppError("Specialist Schedule ID not found.");
        }
        
        if (!userId) {
            throw new AppError("User ID not found.");
        }

        const updateSpecialistScheduleUseCase = container.resolve(
            UpdateSpecialistScheduleUseCase
        );

        const specialistSchedule =
            updateSpecialistScheduleUseCase.execute({
                specialistScheduleId,
                userId,
            });

        return response.status(200).json(specialistSchedule);
    }
}

export { UpdateSpecialistScheduleController };
