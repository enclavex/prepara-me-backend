import { Status } from "aws-sdk/clients/directconnect";

interface IResponseSubscriptionPlanDTO {
    id: string;
    name: string;
    status: string;
    type: string;
    price: Number;
}

export { IResponseSubscriptionPlanDTO };
