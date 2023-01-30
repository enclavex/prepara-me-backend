import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListOrderUseCase {
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) {}

    async execute({ id, userId, status }): Promise<Order[]> {
        const orders = await this.ordersRepository.find({
            id,
            userId,
            status
        });

        return orders;
    }
}

export { ListOrderUseCase };
