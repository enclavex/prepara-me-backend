import { ICreateSubscriptionPlanProductDTO } from "@modules/products/dtos/ICreateSubscriptionPlanProductDTO";
import { SubscriptionPlanProduct } from "@modules/products/infra/typeorm/entities/SubscriptionPlanProduct";
import { ISubscriptionPlanProductsRepository } from "../ISubscriptionPlanProductsRepository";

class SubscriptionPlanProductsRepositoryInMemory
    implements ISubscriptionPlanProductsRepository
{
    subscriptionPlanProducts: SubscriptionPlanProduct[] = [];

    async create({
        availableQuantity,
        productId,
        subscriptionPlanId,
    }: ICreateSubscriptionPlanProductDTO): Promise<SubscriptionPlanProduct> {
        const subscriptionPlanProduct = new SubscriptionPlanProduct(
            subscriptionPlanId,
            productId,
            availableQuantity
        );

        this.subscriptionPlanProducts.push(subscriptionPlanProduct);

        return subscriptionPlanProduct;
    }
}

export { SubscriptionPlanProductsRepositoryInMemory };

