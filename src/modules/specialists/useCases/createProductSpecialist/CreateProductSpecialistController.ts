import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateProductSpecialistUseCase } from "./CreateProductSpecialistUseCase";

class CreateProductSpecialistController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { productId, id } = request.body;

        const { id: specialistId } = request.params;

        const createProductSpecialistUseCase = container.resolve(CreateProductSpecialistUseCase)

        await createProductSpecialistUseCase.execute({
            productId,
            specialistId,
            id
        })

        return response.status(201).json()
    }
}

export { CreateProductSpecialistController }