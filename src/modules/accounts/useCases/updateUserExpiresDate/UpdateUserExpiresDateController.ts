import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserExpiresDateUseCase } from "./UpdateUserExpiresDateUseCase";

class UpdateUserExpiresDateController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const updateUserExpiresDateUseCase = container.resolve(
            UpdateUserExpiresDateUseCase
        );

        await updateUserExpiresDateUseCase.execute({
            user_id: id,
        });

        return response.status(204).send();
    }

    async handleInternal(data): Promise<any> {
        const { userId } = data;

        const updateUserExpiresDateUseCase = container.resolve(
            UpdateUserExpiresDateUseCase
        );

        const userUpdated = await updateUserExpiresDateUseCase.execute({
            user_id: userId,
        });

        return userUpdated;
    }
}

export { UpdateUserExpiresDateController };

