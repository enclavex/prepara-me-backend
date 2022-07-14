import { ICreateCompanySubscriptionPlanDTO } from "../dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlan } from "../infra/typeorm/entities/CompanySubscriptionPlan";

interface ICompanySubscriptionPlans {
    create(
        data: ICreateCompanySubscriptionPlanDTO
    ): Promise<CompanySubscriptionPlan>;
}

export { ICompanySubscriptionPlans };
