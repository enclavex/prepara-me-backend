import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListSpecialistsByProductUseCase } from "./ListSpecialistsByProductUseCase"

class ListSpecialistsByProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { productId } = request.params
        const { dateBegin, dateEnd } = request.body

        const listSpecialistsByProductUseCase = container.resolve(ListSpecialistsByProductUseCase)

        const specialists = await listSpecialistsByProductUseCase.execute({ productId, dateBegin, dateEnd })

        return response.status(201).json(specialists)
    }
}

export { ListSpecialistsByProductController }