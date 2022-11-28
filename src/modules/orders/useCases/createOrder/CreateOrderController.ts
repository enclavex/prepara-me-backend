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
            id,
            companyId,
            expiresAt,
            ordersPaid,
            pagarMeOrderId,
            status,
            short_id: shortId
        } = request.body;

        const createOrderUseCase = container.resolve(CreateOrderUseCase);

        const order = await createOrderUseCase.execute({
            amount,
            dateCreated,
            userId,
            dateUpdated,
            id,
            companyId,
            expiresAt,
            ordersPaid,
            pagarMeOrderId,
            status,
            shortId
        });

        return response.status(201).json(order);
    }
}

export { CreateOrderController };

