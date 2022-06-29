import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListSpecialistAvailableUseCase } from "./ListSpecialistAvailableUseCase"

class ListSpecialistAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSpecialistAvailableUseCase = container.resolve(ListSpecialistAvailableUseCase)

        const listSpecialist = await listSpecialistAvailableUseCase.execute()

        return response.status(201).json(listSpecialist)
    }
}

export { ListSpecialistAvailableController }