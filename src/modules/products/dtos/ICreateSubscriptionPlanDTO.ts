import { SubscriptionPlanStatusEnum } from "../enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "../enums/SubscriptionPlanTypeEnum";

interface ICreateSubscriptionPlanDTO {
    name: string;
    prince: Number;
    status: SubscriptionPlanStatusEnum;
    type: SubscriptionPlanTypeEnum;
    id?: string;
}

export { ICreateSubscriptionPlanDTO };
