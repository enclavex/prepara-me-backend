import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

class CreateCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

        const company = await createCompanyUseCase.execute({ name });

        return response.status(201).send(company);
    }
}

export { CreateCompanyController };

