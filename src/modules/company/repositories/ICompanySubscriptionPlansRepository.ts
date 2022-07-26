import { ICreateCompanySubscriptionPlanDTO } from "../dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlan } from "../infra/typeorm/entities/CompanySubscriptionPlan";

interface ICompanySubscriptionPlansRepository {
    create(
        data: ICreateCompanySubscriptionPlanDTO
    ): Promise<CompanySubscriptionPlan>;
    remove(id: string): Promise<string>;
}

export { ICompanySubscriptionPlansRepository };
