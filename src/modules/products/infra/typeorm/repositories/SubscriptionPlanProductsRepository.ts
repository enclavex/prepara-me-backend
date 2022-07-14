import { ICreateSubscriptionPlanProductDTO } from "@modules/products/dtos/ICreateSubscriptionPlanProductDTO";
import { ISubscriptionPlanProductsRepository } from "@modules/products/repositories/ISubscriptionPlanProductsRepository";
import { getRepository, Repository } from "typeorm";
import { SubscriptionPlanProduct } from "../entities/SubscriptionPlanProduct";

class SubscriptionPlanProductsRepository
    implements ISubscriptionPlanProductsRepository
{
    private repository: Repository<SubscriptionPlanProduct>;

    constructor() {
        this.repository = getRepository(SubscriptionPlanProduct);
    }

    async create({
        availableQuantity,
        productId,
        subscriptionPlanId,
    }: ICreateSubscriptionPlanProductDTO): Promise<SubscriptionPlanProduct> {
        const subscriptionPlanProduct = this.repository.create({
            productId,
            subscriptionPlanId,
            availableQuantity,
        });

        await this.repository.save(subscriptionPlanProduct);

        return subscriptionPlanProduct;
    }
}

export { SubscriptionPlanProductsRepository };
