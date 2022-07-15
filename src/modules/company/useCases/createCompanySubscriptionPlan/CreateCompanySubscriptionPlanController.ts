import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCompanySubscriptionPlanUseCase } from "./CreateCompanySubscriptionPlanUseCase";

class CreateCompanySubscriptionPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            subscriptionPlanId,
            companyId,
            startDate,
            endDate,
            subscribeToken,
        } = request.body;

        const createCompanySubscriptionPlanUseCase = container.resolve(
            CreateCompanySubscriptionPlanUseCase
        );

        const companySubscriptionPlan =
            await createCompanySubscriptionPlanUseCase.execute({
                companyId,
                subscriptionPlanId,
                startDate,
                endDate,
                subscribeToken,
            });

        return response.status(201).json(companySubscriptionPlan);
    }
}

export { CreateCompanySubscriptionPlanController };

