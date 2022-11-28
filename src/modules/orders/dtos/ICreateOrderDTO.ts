import { OrderStatusEnum } from "../enums/OrderStatusEnum";

interface ICreateOrderDTO {
    id?: string;
    userId: string;
    companyId: string;
    dateCreated: Date;
    dateUpdated: Date;
    expiresAt: Date;
    ordersPaid: number;
    pagarMeOrderId?: string;
    amount: number;
    status: OrderStatusEnum,
    shortId: string;
}

export { ICreateOrderDTO };
