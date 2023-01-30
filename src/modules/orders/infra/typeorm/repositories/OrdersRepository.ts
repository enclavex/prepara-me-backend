import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { getRepository, Repository } from "typeorm";
import { Order } from "../entities/Order";

class OrdersRepository implements IOrdersRepository {
    private repository: Repository<Order>;

    constructor() {
        this.repository = getRepository(Order);
    }

    async create({
        userId,
        dateCreated,
        amount,
        id,
        expiresAt,
        companyId,
        ordersPaid,
        dateUpdated,
        pagarMeOrderId,
        status,
        shortId,
        urlPagarMe
    }: ICreateOrderDTO): Promise<Order> {
        const order = this.repository.create({
            userId,
            dateCreated,
            amount,
            id,
            expiresAt,
            companyId,
            ordersPaid,
            dateUpdated,
            pagarMeOrderId,
            status,
            shortId,
            urlPagarMe
        });

        await this.repository.save(order);

        return order;
    }

    async find({ userId, id, status }): Promise<Order[]> {
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
                ordersQuery.andWhere("o.userId = :userId", {
                    userId: userId,
                });
            }

            if (status) {
                ordersQuery.andWhere("o.status = :status", {
                    status: status,
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

