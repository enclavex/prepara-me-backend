import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListCompanyEmployeeUseCase } from "./ListCompanyEmployeeUseCase";

class ListCompanyEmployeeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { name, documentId, userId, phone, email, companyId, notUserId } = request.query;

        const listCompanyEmployeeUseCase = container.resolve(
            ListCompanyEmployeeUseCase
        );

        const companyEmployees = await listCompanyEmployeeUseCase.execute({
            name,
            documentId,
            userId,
            notUserId,
            phone,
            email,
            companyId,
            id,
        });

        return response.status(200).send(companyEmployees);
    }
}

export { ListCompanyEmployeeController };

