import { ICreateSubscriptionPlanProductDTO } from "@modules/products/dtos/ICreateSubscriptionPlanProductDTO";
import { ISubscriptionPlanProductsRepository } from "@modules/products/repositories/ISubscriptionPlanProductsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSubscriptionPlanProductUseCase {
    constructor(
        @inject("SubscriptionPlanProductsRepository")
        private subscriptionPlanProductsRepository: ISubscriptionPlanProductsRepository
    ) {}

    async execute({
        subscriptionPlanId,
        productId,
        availableQuantity,
    }: ICreateSubscriptionPlanProductDTO) {
        if (!subscriptionPlanId) {
            throw new AppError("Subscription Plan can't be null");
        }

        if (!productId) {
            throw new AppError("Product can't be null");
        }

        const subscriptionPlanProduct =
            await this.subscriptionPlanProductsRepository.create({
                subscriptionPlanId,
                productId,
                availableQuantity,
            });

        return subscriptionPlanProduct;
    }
}

export { CreateSubscriptionPlanProductUseCase };
