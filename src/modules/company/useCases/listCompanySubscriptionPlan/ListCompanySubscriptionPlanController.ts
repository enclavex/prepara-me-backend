import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListCompanySubscriptionPlanUseCase } from "./ListCompanySubscriptionPlanUseCase";

class ListCompanySubscriptionPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { companyId, subscribeToken, subscriptionPlanId } = request.query;

        const listCompanySubscriptionPlanUseCase = container.resolve(
            ListCompanySubscriptionPlanUseCase
        );

        const companySubscriptionPlans =
            await listCompanySubscriptionPlanUseCase.execute({
                companyId,
                id,
                subscribeToken,
                subscriptionPlanId,
            });

        return response.status(200).send(companySubscriptionPlans);
    }
}

export { ListCompanySubscriptionPlanController };

