import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetSubscriptionPlanByIdUseCase } from "./GetSubscriptionPlanByIdUseCase";

class GetSubscriptionPlanByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getSubscriptionPlanByIdUseCase = container.resolve(
            GetSubscriptionPlanByIdUseCase
        );

        const subscriptionPlan = await getSubscriptionPlanByIdUseCase.execute(id);

        return response.status(200).send(subscriptionPlan);
    }
}

export { GetSubscriptionPlanByIdController }; 

