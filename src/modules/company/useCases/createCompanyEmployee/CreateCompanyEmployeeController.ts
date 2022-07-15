import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCompanyEmployeeUseCase } from "./CreateCompanyEmployeeUseCase";

class CreateCompanyEmployeeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, documentId, subscribeToken, companyId, userId } =
            request.body;

        const createCompanyEmployeeUseCase = container.resolve(
            CreateCompanyEmployeeUseCase
        );

        const companyEmployee = await createCompanyEmployeeUseCase.execute({
            name,
            companyId,
            documentId,
            subscribeToken,
            userId,
        });

        return response.status(201).send(companyEmployee);
    }
}

export { CreateCompanyEmployeeController };

