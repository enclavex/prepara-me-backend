import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListResumeUseCase } from "./ListResumeUseCase";

class ListResumeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { userId } = request.query;

        let listResumeUseCase = container.resolve(ListResumeUseCase);

        const resumes = await listResumeUseCase.execute({
            id,
            userId,
        });

        return response.status(200).send(resumes);
    }
}

export { ListResumeController };

