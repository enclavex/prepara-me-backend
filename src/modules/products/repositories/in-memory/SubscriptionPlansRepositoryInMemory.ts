import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlan } from "@modules/products/infra/typeorm/entities/SubscriptionPlan";
import { ISubscriptionPlansRepository } from "../ISubscriptionPlansRepository";

class SubscriptionPlansRepositoryInMemory
    implements ISubscriptionPlansRepository
{
    subscriptionPlans: SubscriptionPlan[] = []
    
    async create({
        name,
        price,
        status,
        type,
    }: ICreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        const subscriptionPlan = new SubscriptionPlan(name, price, status, type)

        this.subscriptionPlans.push(subscriptionPlan);

        return subscriptionPlan
    }

    async findById(id: string): Promise<SubscriptionPlan> {
        return this.subscriptionPlans.find((subscriptionPlan) => subscriptionPlan.id === id);
    }

    async findAvailables(): Promise<SubscriptionPlan[]> {
        return this.subscriptionPlans.filter((subscriptionPlan) => {
            return subscriptionPlan.status === SubscriptionPlanStatusEnum.ACTIVE;
        });
    }
}

export { SubscriptionPlansRepositoryInMemory };
