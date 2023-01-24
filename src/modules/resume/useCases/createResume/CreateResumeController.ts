import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateResumeUseCase } from "./CreateResumeUseCase";


class CreateResumeController{
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            city,
            email,
            extraInfo,
            linkedinURL,
            name,
            objectives,
            phone,
            portfolioURL,
            professionalResume,
            resumeAddings,
            state,
            userId,
            id,
        } = request.body;

        const createResumeUseCase = container.resolve(CreateResumeUseCase);

        const resume = await createResumeUseCase.execute({
            city,
            email,
            extraInfo,
            linkedinURL,
            name,
            objectives,
            phone,
            portfolioURL,
            professionalResume,
            resumeAddings,
            state,
            userId,
            id,
        });

        return response.status(201).json(resume);
    }
}

export {CreateResumeController}