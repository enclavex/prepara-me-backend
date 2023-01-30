import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOrderUseCase } from "./ListOrderUseCase";

class ListOrderController {
    async handleInternal(data): Promise<any> {
        const { id, userId, status } = data;

        let listOrdersUseCase = container.resolve(ListOrderUseCase);

        const orders = await listOrdersUseCase.execute({
            id,
            userId,
            status,
        });

        return orders;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { userId, status } = request.query;

        let listOrdersUseCase = container.resolve(ListOrderUseCase);

        const orders = await listOrdersUseCase.execute({
            id,
            userId,
            status,
        });

        return response.status(200).send(orders);
    }
}

export { ListOrderController };

