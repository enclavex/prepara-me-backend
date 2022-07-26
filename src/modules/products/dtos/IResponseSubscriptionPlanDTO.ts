import { SubscriptionPlanProduct } from "../infra/typeorm/entities/SubscriptionPlanProduct";

interface IResponseSubscriptionPlanDTO {
    id: string;
    name: string;
    status: Object;
    type: Object;
    price: Number;
    subscriptionPlanProduct: SubscriptionPlanProduct[]
}

export { IResponseSubscriptionPlanDTO };
