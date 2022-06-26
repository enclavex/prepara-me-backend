import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateProductSpecialistUseCase } from "./CreateProductSpecialistUseCase";

class CreateProductSpecialistController {
    async handle(request: Request, response, Response): Promise<Response> {
        const { products } = request.body;
        const { specialistId } = request.params;

        const createProductSpecialistUseCase = container.resolve(CreateProductSpecialistUseCase)

        await createProductSpecialistUseCase.execute({
            products,
            specialistId
        })

        return response.status(201).json()
    }
}

export { CreateProductSpecialistController }