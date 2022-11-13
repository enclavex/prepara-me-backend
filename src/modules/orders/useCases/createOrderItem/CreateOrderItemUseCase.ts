import { ICreateOrderItemDTO } from "@modules/orders/dtos/ICreateOrderItemDTO";
import { IOrderItemsRepository } from "@modules/orders/repositories/IOrderItemsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateOrderItemUseCase {
    constructor(
        @inject("OrderItemsRepository")
        private orderItemsRepository: IOrderItemsRepository
    ) {}

    async execute({
        id,
        orderId,
        productId,
        amount,
        quantity,
    }: ICreateOrderItemDTO) {
        const orderItem = await this.orderItemsRepository.create({
            id,
            orderId,
            productId,
            amount,
            quantity,
        });
        
        return orderItem;
    }
}

export { CreateOrderItemUseCase };

