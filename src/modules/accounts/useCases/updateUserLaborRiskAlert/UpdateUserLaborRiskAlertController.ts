import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserLaborRiskAlertUseCase } from "./UpdateUserLaborRiskAlertUseCase";

class UpdateUserLaborRiskAlertController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const { laborRiskAlert } = request.body;

        const updateUserLaborRiskAlertUseCase = container.resolve(
            UpdateUserLaborRiskAlertUseCase
        );

        await updateUserLaborRiskAlertUseCase.execute({
            user_id: id,
            laborRiskAlert: laborRiskAlert,
        });

        return response.status(204).send();
    }
}

export { UpdateUserLaborRiskAlertController };

