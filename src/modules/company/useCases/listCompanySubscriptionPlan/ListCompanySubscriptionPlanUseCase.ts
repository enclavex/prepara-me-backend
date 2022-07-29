import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCompanySubscriptionPlanUseCase {
    constructor(
        @inject("CompanySubscriptionPlansRepository")
        private companySubscriptionPlansRepository: ICompanySubscriptionPlansRepository
    ) {}

    async execute({ companyId, id, subscribeToken, subscriptionPlanId }) {
        const companySubscriptionPlans =
            await this.companySubscriptionPlansRepository.find({
                companyId,
                id,
                subscribeToken,
                subscriptionPlanId,
            });

        return companySubscriptionPlans;
    }
}

export { ListCompanySubscriptionPlanUseCase };

