import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProductUseCase } from "./RemoveProductUseCase";

class RemoveProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeProductUseCase = container.resolve(
            RemoveProductUseCase
        );

        const resultRemoveProduct = await removeProductUseCase.execute(id);

        if (!resultRemoveProduct) {
            throw new AppError("Can't delete product")
        }

        return response.status(200).send();
    }
}

export { RemoveProductController };

 