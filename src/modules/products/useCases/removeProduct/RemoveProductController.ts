import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProductUseCase } from "./RemoveProductUseCase";

class RemoveProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeProductUseCase = container.resolve(
            RemoveProductUseCase
        );

        await removeProductUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveProductController };

