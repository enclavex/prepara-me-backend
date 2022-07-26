import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { getRepository, Repository } from "typeorm";
import { CompanySubscriptionPlan } from "../entities/CompanySubscriptionPlan";

class CompanySubscriptionPlansRepository
    implements ICompanySubscriptionPlansRepository
{
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
        id,
    }: ICreateCompanySubscriptionPlanDTO): Promise<CompanySubscriptionPlan> {
        const companySubscriptionPlan = this.repository.create({
            companyId,
            subscriptionPlanId,
            startDate,
            endDate,
            subscribeToken,
            id,
        });

        await this.repository.save(companySubscriptionPlan);

        return companySubscriptionPlan;
    }

    async remove(id: string): Promise<string> {
        this.repository.delete(id);

        return id
    }
}

export { CompanySubscriptionPlansRepository };

