import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            username,
            email,
            password,
            documentId,
            status,
            type,
            subscribeToken,
            id,
            laborRisk,
            NPSSurvey,
            surveyAnswered,
            companyId,
            realocated,
            laborRiskAlert,
            expiresDate,
            periodTest
        } = request.body;

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
            id,
            laborRisk,
            NPSSurvey,
            surveyAnswered,
            companyId,
            realocated,
            laborRiskAlert,
            expiresDate,
            periodTest
        });

        return response.status(201).send();
    }
}

export { CreateUserController };

