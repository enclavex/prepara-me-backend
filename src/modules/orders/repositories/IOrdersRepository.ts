import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { OrderStatusEnum } from "../enums/OrderStatusEnum";
import { Order } from "../infra/typeorm/entities/Order";

interface IRequestFind {
    userId?: string;
    id?: string;
    status?: OrderStatusEnum;
}

interface IOrdersRepository {
    create(data: ICreateOrderDTO): Promise<Order>;
    find(data: IRequestFind): Promise<Order[]>;
    remove(id: string);
}

export { IOrdersRepository };
