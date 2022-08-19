import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, username, email, password, documentId, status, type, subscribeToken, id } =
            request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            username,
            email,
            password,
            documentId,
            type,
            status,
            subscribeToken,
            id
        });

        return response.status(201).send();
    }
}

export { CreateUserController };

