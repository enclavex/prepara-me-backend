import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { IResponseSubscriptionPlanDTO } from "@modules/products/dtos/IResponseSubscriptionPlnaDTO";
import { SubscriptionPlanMap } from "@modules/products/mapper/SubscriptionPlanMap";
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

    async find({
        name,
        status,
        type,
    }): Promise<IResponseSubscriptionPlanDTO[]> {
        const subscriptionPlansQuery = this.repository.createQueryBuilder("sp");

        if (status) {
            subscriptionPlansQuery.andWhere("sp.status = :status", {
                status: status,
            });
        }

        if (type) {
            subscriptionPlansQuery.andWhere("sp.type = :type", {
                type: type,
            });
        }

        if (name) {
            name = `%${name}%`;

            subscriptionPlansQuery.andWhere("sp.name like :name", {
                name: name,
            });
        }

        const subscriptionPlans = await subscriptionPlansQuery.getMany();

        const subscriptionPlansMaped = subscriptionPlans.map(
            (subscriptionPlan) => {
                return SubscriptionPlanMap.toDTO(subscriptionPlan);
            }
        );

        return subscriptionPlansMaped;
    }
}

export { SubscriptionPlansRepository };

