import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListScheduleSpecialistByDateUseCase } from "./ListScheduleSpecialistByDateUseCase"

class ListScheduleSpecialistByDateController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { specialistId } = request.params
        
        const dateBegin = new Date(request.headers.datebegin.toString());
        const dateEnd = new Date(request.headers.dateend.toString());

        const listScheduleSpecialistByDateUseCase = container.resolve(ListScheduleSpecialistByDateUseCase)

        const listScheduleSpecialist = await listScheduleSpecialistByDateUseCase.execute({
            specialistId,
            dateBegin,
            dateEnd
        })

        return response.status(201).json(listScheduleSpecialist)
    }
}

export { ListScheduleSpecialistByDateController }