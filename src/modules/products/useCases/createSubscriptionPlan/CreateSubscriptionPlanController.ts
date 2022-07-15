import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSubscriptionPlanUseCase } from "./CreateSubscriptionPlanUseCase";

class CreateSubscriptionPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, price, status, type } = request.body;

        const createSubscriptionPlanUseCase = container.resolve(
            CreateSubscriptionPlanUseCase
        );

        const createSubscriptionPlan =
            await createSubscriptionPlanUseCase.execute({
                name,
                price,
                status,
                type,
            });

        return response.status(201).send(createSubscriptionPlan);
    }
}

export { CreateSubscriptionPlanController };

