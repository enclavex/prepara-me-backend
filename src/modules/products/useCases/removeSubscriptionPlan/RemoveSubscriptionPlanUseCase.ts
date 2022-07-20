import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveSubscriptionPlanUseCase {
    constructor(
        @inject("SubscriptionPlansRepository")
        private subscriptionPlansRepository: ISubscriptionPlansRepository
    ) {}

    async execute(id) {
        await this.subscriptionPlansRepository.remove(id);
    }
}

export { RemoveSubscriptionPlanUseCase };

