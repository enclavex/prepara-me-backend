import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateSpecialistScheduleAvailableUseCase } from "./CreateSpecialistScheduleAvailableUseCase"

class CreateSpecialistScheduleAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            dateSchedule,
            status
        } = request.body

        const { specialistId } = request.params

        const createSpecialistScheduleAvailableUseCase = container.resolve(CreateSpecialistScheduleAvailableUseCase)

        const specialistScheduleAvailable = await createSpecialistScheduleAvailableUseCase.execute({
            dateSchedule,
            specialistId,
            status
        })

        return response.status(201).json(specialistScheduleAvailable)
    }
}

export { CreateSpecialistScheduleAvailableController }