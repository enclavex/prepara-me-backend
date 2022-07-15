import { ICreateCompanySubscriptionPlanDTO } from "@modules/company/dtos/ICreateCompanySubscriptionPlanDTO";
import { CompanySubscriptionPlan } from "@modules/company/infra/typeorm/entities/CompanySubscriptionPlan";
import { ICompanySubscriptionPlansRepository } from "@modules/company/repositories/ICompanySubscriptionPlansRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCompanySubscriptionPlanUseCase {
    constructor(
        @inject("CompanySubscriptionPlansRepository")
        private companySubscriptionPlansRepository: ICompanySubscriptionPlansRepository
    ) {}

    async execute({
        companyId,
        subscriptionPlanId,
        startDate,
        endDate,
        subscribeToken,
    }: ICreateCompanySubscriptionPlanDTO): Promise<CompanySubscriptionPlan> {
        if (!companyId) {
            throw new AppError("Company can't be null");
        }

        if (!subscriptionPlanId) {
            throw new AppError("Subscription Plan can't be null");
        }

        if (!startDate) {
            throw new AppError("Start Date can't be null");
        }

        if (!endDate) {
            throw new AppError("End Date can't be null");
        }

        if (endDate < startDate) {
            throw new AppError("End Date can't be before Start Date");
        }

        if (!subscribeToken) {
            throw new AppError("Subscribe Token can't be null");
        }

        const companySubscriptionPlan =
            await this.companySubscriptionPlansRepository.create({
                companyId,
                subscriptionPlanId,
                startDate,
                endDate,
                subscribeToken,
            });

        return companySubscriptionPlan;
    }
}

export { CreateCompanySubscriptionPlanUseCase };

