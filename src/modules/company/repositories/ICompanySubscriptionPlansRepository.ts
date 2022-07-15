import { ICreateCompanySubscriptionPlanDTO } from "../dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlan } from "../infra/typeorm/entities/CompanySubscriptionPlan";

interface ICompanySubscriptionPlansRepository {
    create(
        data: ICreateCompanySubscriptionPlanDTO
    ): Promise<CompanySubscriptionPlan>;
}

export { ICompanySubscriptionPlansRepository };
