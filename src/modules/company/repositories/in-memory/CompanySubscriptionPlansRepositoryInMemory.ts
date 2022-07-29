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
        id,
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

    async find({
        companyId,
        subscriptionPlanId,
        subscribeToken,
        id,
    }): Promise<CompanySubscriptionPlan[]> {
        let companySubscriptionPlans = this.companySubscriptionPlans;

        if (id) {
            companySubscriptionPlans = companySubscriptionPlans.filter(
                (companySubscriptionPlan) => {
                    return companySubscriptionPlan.id === id;
                }
            );
        } else {
            if (companyId) {
                companySubscriptionPlans = companySubscriptionPlans.filter(
                    (companySubscriptionPlan) => {
                        return companySubscriptionPlan.companyId === companyId;
                    }
                );
            }

            if (subscriptionPlanId) {
                companySubscriptionPlans = companySubscriptionPlans.filter(
                    (companySubscriptionPlan) => {
                        return (
                            companySubscriptionPlan.subscriptionPlanId ===
                            subscriptionPlanId
                        );
                    }
                );
            }

            if (subscribeToken) {
                companySubscriptionPlans = companySubscriptionPlans.filter(
                    (companySubscriptionPlan) => {
                        return (
                            companySubscriptionPlan.subscribeToken ===
                            subscribeToken
                        );
                    }
                );
            }
        }

        return companySubscriptionPlans;
    }

    async remove(id: string): Promise<string> {
        this.companySubscriptionPlans = this.companySubscriptionPlans.filter(
            (companySubscriptionPlan) => {
                return id !== companySubscriptionPlan.id;
            }
        );

        return id;
    }
}

export { CompanySubscriptionPlansRepositoryInMemory };

