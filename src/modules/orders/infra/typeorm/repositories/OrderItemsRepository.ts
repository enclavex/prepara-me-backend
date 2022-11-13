import { ICreateOrderItemDTO } from "@modules/orders/dtos/ICreateOrderItemDTO";
import { IOrderItemsRepository } from "@modules/orders/repositories/IOrderItemsRepository";
import { getRepository, Repository } from "typeorm";
import { OrderItem } from "../entities/OrderItem";

class OrderItemsRepository implements IOrderItemsRepository{
    private repository: Repository<OrderItem>;

    constructor() {
        this.repository = getRepository(OrderItem);
    }

    async create({
        id,
        orderId,
        productId,
        amount,
        quantity,
    }: ICreateOrderItemDTO): Promise<OrderItem> {
        const orderItem = this.repository.create({
            id,
            orderId,
            productId,
            amount,
            quantity,
        });

        await this.repository.save(orderItem);

        return orderItem;
    }
}

export { OrderItemsRepository };
