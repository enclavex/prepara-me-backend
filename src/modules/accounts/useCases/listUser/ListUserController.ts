import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserUseCase } from "./ListUserUseCase";

class ListUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const {
            name,
            status,
            type,
            email,
            documentId,
            realocated,
            laborRiskAlert,
        } = request.query;

        let listUserUseCase = container.resolve(ListUserUseCase);

        const users = await listUserUseCase.execute({
            name,
            type,
            status,
            email,
            documentId,
            id,
            realocated,
            laborRiskAlert,
        });

        return response.status(200).send(users);
    }
}

export { ListUserController };

