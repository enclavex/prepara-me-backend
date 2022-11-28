import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListOrderUseCase } from "./ListOrderUseCase";

class ListOrderController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { userId } = request.query;

        let listOrdersUseCase = container.resolve(ListOrderUseCase);

        const orders = await listOrdersUseCase.execute({
            id,
            userId,
        });

        return response.status(200).send(orders);
    }
}

export { ListOrderController };
