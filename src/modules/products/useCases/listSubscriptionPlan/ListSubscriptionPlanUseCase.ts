import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSubscriptionPlanUseCase {
    constructor(
        @inject("SubscriptionPlansRepository")
        private subscriptionPlansRepository: ISubscriptionPlansRepository
    ) {}

    async execute({
        name,
        status,
        type,
        id
    }
    ) {
        if (
            status &&
            !Object.values(SubscriptionPlanStatusEnum).includes(status)
        ) {
            throw new AppError("Status entered wrong");
        }

        if (type && !Object.values(SubscriptionPlanTypeEnum).includes(type)) {
            throw new AppError("Type entered wrong");
        }

        const subscriptionPlans = this.subscriptionPlansRepository.find({
            name,
            status,
            type,
            id
        });

        return subscriptionPlans;
    }
}

export { ListSubscriptionPlanUseCase };

