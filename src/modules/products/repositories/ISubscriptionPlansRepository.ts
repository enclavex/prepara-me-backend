import { ICreateSubscriptionPlanDTO } from "../dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlan } from "../infra/typeorm/entities/SubscriptionPlan";

interface ISubscriptionPlansRepository {
    create(data: ICreateSubscriptionPlanDTO): Promise<SubscriptionPlan>;
    findById(id: string): Promise<SubscriptionPlan>;
    findAvailables(): Promise<SubscriptionPlan[]>;
}

export { ISubscriptionPlansRepository };
