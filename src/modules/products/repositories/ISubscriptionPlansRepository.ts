import { ICreateSubscriptionPlanDTO } from "../dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlan } from "../infra/typeorm/entities/SubscriptionPlan";

import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { IResponseSubscriptionPlanDTO } from "../dtos/IResponseSubscriptionPlnaDTO";

interface IRequestFind {
    name?: string;
    status?: SubscriptionPlanStatusEnum;
    type?: SubscriptionPlanTypeEnum;
}

interface ISubscriptionPlansRepository {
    create(data: ICreateSubscriptionPlanDTO): Promise<SubscriptionPlan>;
    findById(id: string): Promise<SubscriptionPlan>;
    find(data: IRequestFind): Promise<IResponseSubscriptionPlanDTO[]>;
}

export { ISubscriptionPlansRepository };

