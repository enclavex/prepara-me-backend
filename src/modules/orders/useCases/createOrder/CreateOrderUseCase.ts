import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateOrderUseCase {
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) {}

    async execute({
        amount,
        dateCreated,
        userId,
        dateUpdated,
        id,
        companyId,
        expiresAt,
        ordersPaid,
        pagarMeOrderId,
        status,
        shortId
    }: ICreateOrderDTO) {
        const order = await this.ordersRepository.create({
            amount,
            dateCreated,
            userId,
            dateUpdated,
            id,
            companyId,
            expiresAt,
            ordersPaid,
            pagarMeOrderId,
            status,
            shortId
        });

        return order;
    }
}

export { CreateOrderUseCase };

