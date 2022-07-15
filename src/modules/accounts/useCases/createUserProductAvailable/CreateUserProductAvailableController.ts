import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserProductAvailableUseCase } from "./CreateUserProductAvailableUseCase";

class CreateUserProductAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { userId, productId, availableQuantity } = request.body;

        const createUserProductAvailableUseCase = container.resolve(
            CreateUserProductAvailableUseCase
        );

        const userProductAvailable =
            await createUserProductAvailableUseCase.execute({
                userId,
                productId,
                availableQuantity,
            });

        return response.status(201).send(userProductAvailable);
    }
}

export { CreateUserProductAvailableController };

