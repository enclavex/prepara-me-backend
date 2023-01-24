import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveResumeUseCase } from "./RemoveResumeUseCase";

class RemoveResumeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeResumeUseCase = container.resolve(
            RemoveResumeUseCase
        );

        const resultRemoveResume = await removeResumeUseCase.execute(id);

        if (!resultRemoveResume) {
            throw new AppError("Can't delete resume")
        }

        return response.status(200).send();
    }
}

export { RemoveResumeController };

 