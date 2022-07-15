import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { SubscriptionPlan } from "@modules/products/infra/typeorm/entities/SubscriptionPlan";
import { ISubscriptionPlansRepository } from "@modules/products/repositories/ISubscriptionPlansRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSubscriptionPlanUseCase {
    constructor(
        @inject("SubscriptionPlansRepository")
        private subscriptionPlansRepository: ISubscriptionPlansRepository
    ) {}

    async execute({
        name,
        price,
        status,
        type,
    }: ICreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        if (!name) {
            throw new AppError("Name can't be null");
        }

        if (!Object.values(SubscriptionPlanStatusEnum).includes(status)) {
            throw new AppError("Status entered wrong");
        }

        if (!Object.values(SubscriptionPlanTypeEnum).includes(type)) {
            throw new AppError("Status entered wrong");
        }

        const subscriptionPlan = await this.subscriptionPlansRepository.create({
            name,
            price,
            status,
            type,
        });

        return subscriptionPlan;
    }
}

export { CreateSubscriptionPlanUseCase };

