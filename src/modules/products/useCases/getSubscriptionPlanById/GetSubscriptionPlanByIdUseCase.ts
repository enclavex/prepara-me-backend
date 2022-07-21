import { SubscriptionPlan } from "@modules/products/infra/typeorm/entities/SubscriptionPlan";
import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetSubscriptionPlanByIdUseCase {
    constructor(
        @inject("SubscriptionPlansRepository")
        private subscriptionPlansRepository: ISubscriptionPlansRepository
    ) {}

    async execute(id: string): Promise<SubscriptionPlan> {
        const subscriptionPlan = await this.subscriptionPlansRepository.findById(id);

        return subscriptionPlan;
    }
}

export { GetSubscriptionPlanByIdUseCase };

