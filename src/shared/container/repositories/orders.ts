import { container, delay } from 'tsyringe';
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { OrderItemsRepository } from "@modules/orders/infra/typeorm/repositories/OrderItemsRepository";
import { IOrderItemsRepository } from "@modules/orders/repositories/IOrderItemsRepository";

container.registerSingleton<IOrdersRepository>(
    "OrdersRepository",
    delay(() => OrdersRepository)
);

container.registerSingleton<IOrderItemsRepository>(
    "OrderItemsRepository",
    delay(() => OrderItemsRepository)
);