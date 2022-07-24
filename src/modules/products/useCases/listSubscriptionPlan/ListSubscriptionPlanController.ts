import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSubscriptionPlanUseCase } from "./ListSubscriptionPlanUseCase";

class ListSubscriptionPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, status, type } = request.query;
        const { id } = request.params;

        
        const listSubscriptionPlanUseCase = container.resolve(
            ListSubscriptionPlanUseCase
            );
            
        const listSubscriptionPlans = await listSubscriptionPlanUseCase.execute(
            { name, status, type, id }
        );

        return response.status(200).send(listSubscriptionPlans);
    }
}

export { ListSubscriptionPlanController };

