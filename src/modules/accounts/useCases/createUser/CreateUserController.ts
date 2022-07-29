import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, username, email, password, documentId, type, subscribeToken } =
            request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            username,
            email,
            password,
            documentId,
            type,
            active: UserStatusEnum.ACTIVE,
            subscribeToken
        });

        return response.status(201).send();
    }
}

export { CreateUserController };

