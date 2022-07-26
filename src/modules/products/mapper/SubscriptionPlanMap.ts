import { instanceToInstance } from "class-transformer";
import { IResponseSubscriptionPlanDTO } from "../dtos/IResponseSubscriptionPlanDTO";
import { SubscriptionPlan } from "../infra/typeorm/entities/SubscriptionPlan";

class SubscriptionPlanMap {
    static toDTO({
        id,
        name,
        price,
        status,
        type,
        subscriptionPlanProduct
    }: SubscriptionPlan): IResponseSubscriptionPlanDTO {
        const statusMapped = status === "ACTIVE" ? "Ativo" : "Inativo";
        const typeMapped = type === "SITE" ? "Site" : "Empresa";

        const subscriptionPlan = instanceToInstance({
            id,
            name,
            price,
            status: { label: statusMapped, value: status },
            type: { label: typeMapped, value: type },
            subscriptionPlanProduct
        });

        return subscriptionPlan;
    }
}

export { SubscriptionPlanMap };
