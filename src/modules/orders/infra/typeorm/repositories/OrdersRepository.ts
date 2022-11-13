import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { getRepository, Repository } from "typeorm";
import { Order } from "../entities/Order";

class OrdersRepository implements IOrdersRepository{
    private repository: Repository<Order>;

    constructor() {
        this.repository = getRepository(Order);
    }

    async create({
        userId,
        dateCreated,
        amount,
        id,
        object,
        status,
        model,
        modelId,
        headers,
        payload,
        requestUrl,
        retries,
        nextRetry,
        deliveries,
        dateUpdated,
        signature,
        pagarMeOrderId,
    }: ICreateOrderDTO): Promise<Order> {
        const order = this.repository.create({
            userId,
            dateCreated,
            amount,
            id,
            object,
            status,
            model,
            modelId,
            headers,
            payload,
            requestUrl,
            retries,
            nextRetry,
            deliveries,
            dateUpdated,
            signature,
            pagarMeOrderId,
        });

        await this.repository.save(order);

        return order;
    }

    async find({ userId, id }): Promise<Order[]> {
        const ordersQuery = this.repository
            .createQueryBuilder("o")
            .leftJoinAndSelect("o.orderItem", "orderItem")
            .leftJoinAndSelect("orderItem.product", "product");

        if (id) {
            ordersQuery.andWhere("o.id = :id", {
                id: id,
            });
        } else {
            if (userId) {
                ordersQuery.andWhere("o.userId like :userId", {
                    userId: userId,
                });
            }
        }

        const orders = await ordersQuery.getMany();

        return orders;
    }

    async remove(id: string): Promise<void> {
        this.repository.delete(id);
    }
}

export { OrdersRepository };

