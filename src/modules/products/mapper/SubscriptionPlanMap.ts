import { instanceToInstance } from "class-transformer";
import { IResponseSubscriptionPlanDTO } from "../dtos/IResponseSubscriptionPlnaDTO";
import { SubscriptionPlan } from "../infra/typeorm/entities/SubscriptionPlan";

class SubscriptionPlanMap {
    static toDTO({
        id,
        name,
        price,
        status,
        type,
    }: SubscriptionPlan): IResponseSubscriptionPlanDTO {
        const statusMaped = status === "ACTIVE" ? "Ativo" : "Inativo";
        const typeMaped = type === "SITE" ? "Site" : "Empresa";

        const subscriptionPlan = instanceToInstance({
            id,
            name,
            price,
            status: statusMaped,
            type: typeMaped,
        });

        return subscriptionPlan;
    }
}

export { SubscriptionPlanMap };
