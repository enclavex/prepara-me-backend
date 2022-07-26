import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveCompanySubscriptionPlanUseCase {
    constructor(
        @inject("CompanySubscriptionPlansRepository")
        private companySubscriptionPlans: ICompanySubscriptionPlansRepository
    ) {}

    async execute(id) {
        return await this.companySubscriptionPlans.remove(id);
    }
}

export { RemoveCompanySubscriptionPlanUseCase };

