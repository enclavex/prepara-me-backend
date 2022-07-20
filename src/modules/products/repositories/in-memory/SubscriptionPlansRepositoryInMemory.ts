import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { IResponseSubscriptionPlanDTO } from "@modules/products/dtos/IResponseSubscriptionPlnaDTO";
import { SubscriptionPlan } from "@modules/products/infra/typeorm/entities/SubscriptionPlan";
import { SubscriptionPlanMap } from "@modules/products/mapper/SubscriptionPlanMap";
import { ISubscriptionPlansRepository } from "../ISubscriptionPlansRepository";

class SubscriptionPlansRepositoryInMemory
    implements ISubscriptionPlansRepository
{
    subscriptionPlans: SubscriptionPlan[] = [];

    async create({
        name,
        price,
        status,
        type,
    }: ICreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        const subscriptionPlan = new SubscriptionPlan(
            name,
            price,
            status,
            type
        );

        this.subscriptionPlans.push(subscriptionPlan);

        return subscriptionPlan;
    }

    async findById(id: string): Promise<SubscriptionPlan> {
        return this.subscriptionPlans.find(
            (subscriptionPlan) => subscriptionPlan.id === id
        );
    }

    async find({
        name,
        status,
        type,
    }): Promise<IResponseSubscriptionPlanDTO[]> {
        let subscriptionPlans = this.subscriptionPlans;

        if (status) {
            subscriptionPlans = subscriptionPlans.filter((subscriptionPlan) => {
                return subscriptionPlan.status === status;
            });
        }

        if (type) {
            subscriptionPlans = subscriptionPlans.filter((subscriptionPlan) => {
                return subscriptionPlan.type === type;
            });
        }

        if (name) {
            subscriptionPlans = subscriptionPlans.filter((subscriptionPlan) => {
                return subscriptionPlan.name.includes(name);
            });
        }

        const subscriptionPlansMaped = subscriptionPlans.map(
            (subscriptionPlan) => {
                return SubscriptionPlanMap.toDTO(subscriptionPlan);
            }
        );

        return subscriptionPlansMaped;
    }
}

export { SubscriptionPlansRepositoryInMemory };

