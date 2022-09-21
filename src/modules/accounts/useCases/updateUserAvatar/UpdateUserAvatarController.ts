import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        var { userId } = request.params;

        if (!userId) {
            userId = request.user.id;
        }

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        const avatar_file = request.file.filename;

        await updateUserAvatarUseCase.execute({
            user_id: userId,
            avatar_file,
        });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };

