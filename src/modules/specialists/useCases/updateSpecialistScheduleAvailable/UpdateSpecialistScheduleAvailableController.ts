import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateSpecialistScheduleAvailableUseCase } from "./UpdateSpecialistScheduleAvailableUseCase";

class UpdateSpecialistScheduleAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { specialistScheduleAvailableId } = request.params;
        const userId = request.user.id;

        if (!specialistScheduleAvailableId) {
            throw new AppError("Specialist Schedule ID not found.");
        }
        
        if (!userId) {
            throw new AppError("User ID not found.");
        }

        const updateSpecialistScheduleAvailableUseCase = container.resolve(
            UpdateSpecialistScheduleAvailableUseCase
        );

        const specialistScheduleAvailable =
            updateSpecialistScheduleAvailableUseCase.execute({
                specialistScheduleAvailableId,
                userId,
            });

        return response.status(200).json(specialistScheduleAvailable);
    }
}

export { UpdateSpecialistScheduleAvailableController };
