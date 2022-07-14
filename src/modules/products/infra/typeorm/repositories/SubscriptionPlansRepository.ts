import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { getRepository, Repository } from "typeorm";
import { SubscriptionPlan } from "../entities/SubscriptionPlan";

class SubscriptionPlansRepository implements ISubscriptionPlansRepository {
    private repository: Repository<SubscriptionPlan>;

    constructor() {
        this.repository = getRepository(SubscriptionPlan);
    }

    async create({
        name,
        price,
        status,
        type,
    }: ICreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        const subscriptionPlan = this.repository.create({
            name,
            price,
            status,
            type,
        });

        await this.repository.save(subscriptionPlan);

        return subscriptionPlan;
    }

    async findById(id: string): Promise<SubscriptionPlan> {
        const subscriptionPlan = await this.repository.findOne(id);
        return subscriptionPlan;
    }

    async findAvailables(): Promise<SubscriptionPlan[]> {
        const subscriptionPlansQuery = this.repository
            .createQueryBuilder("sp")
            .where("p.status = :status", { status: SubscriptionPlanStatusEnum.ACTIVE });

        const subscriptionPlans = await subscriptionPlansQuery.getMany();

        return subscriptionPlans;
    }
}

export { SubscriptionPlansRepository };

