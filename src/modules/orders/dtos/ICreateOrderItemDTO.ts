interface ICreateOrderItemDTO {
    id?: string;
    orderId: string;
    productId: string;
    amount: number;
    quantity: number;
}

export { ICreateOrderItemDTO };
