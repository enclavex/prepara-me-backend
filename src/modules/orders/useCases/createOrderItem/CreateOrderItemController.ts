import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderItemUseCase } from "./CreateOrderItemUseCase";

class CreateOrderItemController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, orderId, productId, amount, quantity } = request.body;

        const createOrderItemUseCase = container.resolve(
            CreateOrderItemUseCase
        );

        const orderItem = await createOrderItemUseCase.execute({
            id,
            orderId,
            productId,
            amount,
            quantity,
        });

        return response.status(201).json(orderItem);
    }
}

export { CreateOrderItemController };
