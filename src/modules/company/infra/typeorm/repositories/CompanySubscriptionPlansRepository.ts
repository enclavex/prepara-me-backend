import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { ICompanySubscriptionPlans } from "@modules/company/repositories/ICompanySubscriptionPlans";
import { getRepository, Repository } from "typeorm";
import { CompanySubscriptionPlan } from "../entities/CompanySubscriptionPlan";

class CompanySubscriptionPlansRepository implements ICompanySubscriptionPlans {
    private repository: Repository<CompanySubscriptionPlan>;

    constructor() {
        this.repository = getRepository(CompanySubscriptionPlan);
    }

    async create({
        companyId,
        subscriptionPlanId,
        startDate,
        endDate,
        subscribeToken,
    }: ICreateCompanySubscriptionPlanDTO): Promise<CompanySubscriptionPlan> {
        const companySubscriptionPlan = this.repository.create({
            companyId,
            subscriptionPlanId,
            startDate,
            endDate,
            subscribeToken,
        });

        await this.repository.save(companySubscriptionPlan);

        return companySubscriptionPlan;
    }
}

export { CompanySubscriptionPlansRepository };

