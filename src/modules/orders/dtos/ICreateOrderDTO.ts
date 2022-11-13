interface ICreateOrderDTO {
    id?: string;
    userId: string;
    object?: string;
    status?: string;
    model?: string;
    modelId?: string;
    headers?: string;
    payload?: string;
    requestUrl?: string;
    retries?: string;
    nextRetry?: string;
    deliveries?: string;
    dateCreated: Date;
    dateUpdated?: Date;
    signature?: string;
    pagarMeOrderId?: string;
    amount: number;
}

export { ICreateOrderDTO };
