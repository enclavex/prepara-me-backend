import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSubscriptionPlanProductUseCase } from "./CreateSubscriptionPlanProductUseCase";

class CreateSubscriptionPlanProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { subscriptionPlanId, productId, availableQuantity } =
            request.body;

        const createSubscriptionPlanProductUseCase = container.resolve(
            CreateSubscriptionPlanProductUseCase
        );

        const subscriptionPlanProduct =
            await createSubscriptionPlanProductUseCase.execute({
                subscriptionPlanId,
                productId,
                availableQuantity,
            });

        return response.status(201).json(subscriptionPlanProduct);
    }
}

export { CreateSubscriptionPlanProductController };
