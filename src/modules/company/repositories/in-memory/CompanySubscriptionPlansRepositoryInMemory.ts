import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlan } from "@modules/company/infra/typeorm/entities/CompanySubscriptionPlan";
import { ICompanySubscriptionPlans } from "../ICompanySubscriptionPlans";

class CompanySubscriptionPlansRepositoryInMemory
    implements ICompanySubscriptionPlans
{
    companySubscriptionPlans: CompanySubscriptionPlan[] = [];

    async create({
        companyId,
        endDate,
        startDate,
        subscribeToken,
        subscriptionPlanId,
    }: ICreateCompanySubscriptionPlanDTO): Promise<CompanySubscriptionPlan> {
        const companySubscriptionPlan = new CompanySubscriptionPlan(
            companyId,
            subscriptionPlanId,
            startDate,
            endDate,
            subscribeToken
        );

        this.companySubscriptionPlans.push(companySubscriptionPlan);

        return companySubscriptionPlan;
    }
}

export { CompanySubscriptionPlansRepositoryInMemory };

