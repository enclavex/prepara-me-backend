import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCompanyEmployeeUseCase } from "./RemoveCompanyEmployeeUseCase";

class RemoveCompanyEmployeeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeCompanyEmployeeUseCase = container.resolve(
            RemoveCompanyEmployeeUseCase
        );

        await removeCompanyEmployeeUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveCompanyEmployeeController };
