import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProductContentUseCase } from "./RemoveProductContentUseCase";

class RemoveProductContentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeProductContentUseCase = container.resolve(
            RemoveProductContentUseCase
        );

        await removeProductContentUseCase.execute(id);

        return response.status(200).send();
    } 
}

export { RemoveProductContentController };

