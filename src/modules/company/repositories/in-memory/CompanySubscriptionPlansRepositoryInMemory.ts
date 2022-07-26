import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlan } from "@modules/company/infra/typeorm/entities/CompanySubscriptionPlan";
import { ICompanySubscriptionPlansRepository } from "../ICompanySubscriptionPlansRepository";

class CompanySubscriptionPlansRepositoryInMemory
    implements ICompanySubscriptionPlansRepository
{
    companySubscriptionPlans: CompanySubscriptionPlan[] = [];

    async create({
        companyId,
        endDate,
        startDate,
        subscribeToken,
        subscriptionPlanId,
        id
    }: ICreateCompanySubscriptionPlanDTO): Promise<CompanySubscriptionPlan> {
        const companySubscriptionPlan = new CompanySubscriptionPlan(
            companyId,
            subscriptionPlanId,
            startDate,
            endDate,
            subscribeToken,
            id
        );

        this.companySubscriptionPlans.push(companySubscriptionPlan);

        return companySubscriptionPlan;
    }
}

export { CompanySubscriptionPlansRepositoryInMemory };

