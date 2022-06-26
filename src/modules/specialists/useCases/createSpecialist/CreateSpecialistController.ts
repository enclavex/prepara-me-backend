import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateSpecialistUseCase } from "./CreateSpecialistUseCase"

class CreateSpecialistController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, bio, userId, status, linkedinUrl } = request.body

        const createSpecialistUseCase = container.resolve(CreateSpecialistUseCase)

        const specialist = await createSpecialistUseCase.execute({
            name,
            bio,
            userId,
            status,
            linkedinUrl
        })

        return response.status(201).json(specialist)
    }
}

export { CreateSpecialistController }