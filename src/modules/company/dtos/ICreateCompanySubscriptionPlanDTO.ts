interface ICreateCompanySubscriptionPlanDTO {
    companyId: string;
    subscriptionPlanId: string;
    startDate: Date;
    endDate: Date;
    subscribeToken: string;
    id?: string;
}

export { ICreateCompanySubscriptionPlanDTO };
