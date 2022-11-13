import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            amount,
            dateCreated,
            userId,
            dateUpdated,
            deliveries,
            headers,
            id,
            model,
            modelId,
            nextRetry,
            object,
            pagarMeOrderId,
            payload,
            requestUrl,
            retries,
            signature,
            status,
        } = request.body;

        const createOrderUseCase = container.resolve(CreateOrderUseCase);

        const order = await createOrderUseCase.execute({
            amount,
            dateCreated,
            userId,
            dateUpdated,
            deliveries,
            headers,
            id,
            model,
            modelId,
            nextRetry,
            object,
            pagarMeOrderId,
            payload,
            requestUrl,
            retries,
            signature,
            status,
        });

        return response.status(201).json(order);
    }
}

export { CreateOrderController };

