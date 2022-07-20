import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveSubscriptionPlanUseCase } from "./RemoveSubscriptionPlanUseCase";

class RemoveSubscriptionPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeSubscriptionPlanUseCase = container.resolve(
            RemoveSubscriptionPlanUseCase
        );

        await removeSubscriptionPlanUseCase.execute(id);

        return response.status(200).send();
    }
}

export { RemoveSubscriptionPlanController };

