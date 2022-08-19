import { ICreateSubscriptionNewsletterDTO } from "@modules/accounts/dtos/ICreateSubscriptionNewsletterDTO";
import { SubscriptionNewsletter } from "@modules/accounts/infra/typeorm/entities/SubscriptionNewsletter";
import { ISubscriptionNewslettersRepository } from "@modules/accounts/repositories/ISubcriptionNewslettersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSubscriptionNewsletterUseCase {
    constructor(
        @inject("SubscriptionNewslettersRepository")
        private subscriptionNewslettersRepository: ISubscriptionNewslettersRepository
    ) {
    }

    async execute({ id, email }: ICreateSubscriptionNewsletterDTO): Promise<SubscriptionNewsletter> {
        if (!email) {
            throw new AppError("E-mail can't be null!");
        }

        const subscriptionNewsletterCreated =
            await this.subscriptionNewslettersRepository.create({
                email,
                id,
            });

        return subscriptionNewsletterCreated;
    }
}

export { CreateSubscriptionNewsletterUseCase };

