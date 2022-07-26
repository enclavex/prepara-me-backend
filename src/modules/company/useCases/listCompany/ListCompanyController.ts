import { container } from "tsyringe";
import { ListCompanyUseCase } from "./ListCompanyUseCase";
import {Request, Response} from "express"

class ListCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { name } = request.query;

        const listCompanyUseCase = container.resolve(ListCompanyUseCase);

        const companies = await listCompanyUseCase.execute({name, id});

        return response.status(200).send(companies);
    }
}

export { ListCompanyController };
