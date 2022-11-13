import { ICreateOrderItemDTO } from "../dtos/ICreateOrderItemDTO";
import { OrderItem } from "../infra/typeorm/entities/OrderItem";

interface IOrderItemsRepository {
    create(data: ICreateOrderItemDTO): Promise<OrderItem>;
}

export { IOrderItemsRepository };
