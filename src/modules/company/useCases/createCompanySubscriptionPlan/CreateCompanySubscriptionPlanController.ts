import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCompanySubscriptionPlanUseCase } from "./CreateCompanySubscriptionPlanUseCase";

class CreateCompanySubscriptionPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        let {
            subscriptionPlanId,
            startDate,
            endDate,
            subscribeToken,
            id
        } = request.body;

        const { id: companyId } = request.params;

        const createCompanySubscriptionPlanUseCase = container.resolve(
            CreateCompanySubscriptionPlanUseCase
        );

        const startDateParts = startDate.split("/");
        const endDateParts = endDate.split("/");

        startDate = new Date(`${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`);
        endDate = new Date(`${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`);

        const companySubscriptionPlan =
            await createCompanySubscriptionPlanUseCase.execute({
                companyId,
                subscriptionPlanId,
                startDate,
                endDate,
                subscribeToken,
                id
            });

        return response.status(201).json(companySubscriptionPlan);
    }
}

export { CreateCompanySubscriptionPlanController };

