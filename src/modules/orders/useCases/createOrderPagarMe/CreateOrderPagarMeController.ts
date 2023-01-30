import { Request, Response } from "express";
import { CreateOrderPagarMeUseCase } from "./CreateOrderPagarMeUseCase";

class CreateOrderPagarMeController {
    async handleInternal(data): Promise<any> {
        const { items, amount } = data;

        const createOrderPagarMeUseCase = new CreateOrderPagarMeUseCase();

        const order = await createOrderPagarMeUseCase.execute({
            items,
            amount,
        });

        return order;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { items, amount } = request.body;

        const createOrderPagarMeUseCase = new CreateOrderPagarMeUseCase();

        const order = await createOrderPagarMeUseCase.execute({
            items,
            amount,
        });

        return response.status(201).json(order);
    }
}

export { CreateOrderPagarMeController };

