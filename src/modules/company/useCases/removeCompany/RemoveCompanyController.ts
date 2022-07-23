import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCompanyUseCase } from "./RemoveCompanyUseCase";

class RemoveCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeCompanyUseCase = container.resolve(
            RemoveCompanyUseCase
        );

        await removeCompanyUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveCompanyController };

