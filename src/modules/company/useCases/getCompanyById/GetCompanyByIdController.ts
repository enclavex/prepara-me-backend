import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCompanyByIdUseCase } from "./GetCompanyByIdUseCase";

class GetCompanyByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getCompanyByIdUseCase = container.resolve(GetCompanyByIdUseCase);

        const company = await getCompanyByIdUseCase.execute(id)

        return response.status(200).send(company);
    }
}

export { GetCompanyByIdController };

