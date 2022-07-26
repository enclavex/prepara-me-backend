import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCompanySubscriptionPlanUseCase } from "./RemoveCompanySubscriptionPlanUseCase";

class RemoveCompanySubscriptionPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeCompanySubscriptionPlanUseCase = container.resolve(
            RemoveCompanySubscriptionPlanUseCase
        );

        await removeCompanySubscriptionPlanUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveCompanySubscriptionPlanController };

