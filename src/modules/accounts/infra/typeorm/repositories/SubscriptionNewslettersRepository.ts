import { ICreateSubscriptionNewsletterDTO } from "@modules/accounts/dtos/ICreateSubscriptionNewsletterDTO";
import { ISubscriptionNewsletterResponseDTO } from "@modules/accounts/dtos/ISubscriptionNewsletterResponseDTO";
import { ISubscriptionNewslettersRepository } from "@modules/accounts/repositories/ISubcriptionNewslettersRepository";
import { getRepository, Repository } from "typeorm";
import { SubscriptionNewsletter } from "../entities/SubscriptionNewsletter";

class SubscriptionNewslettersRepository
    implements ISubscriptionNewslettersRepository
{
    private repository: Repository<SubscriptionNewsletter>;

    constructor() {
        this.repository = getRepository(SubscriptionNewsletter);
    }

    async create({
        id,
        email,
    }: ICreateSubscriptionNewsletterDTO): Promise<SubscriptionNewsletter> {
        const subscriptionNewsletter = this.repository.create({
            id,
            email,
        });

        await this.repository.save(subscriptionNewsletter);

        return subscriptionNewsletter;
    }

    async find({ id, email }): Promise<ISubscriptionNewsletterResponseDTO[]> {
        const subscriptionNewslettersQuery =
            this.repository.createQueryBuilder("sn");

        if (id) {
            subscriptionNewslettersQuery.andWhere("sn.id = :id", {
                id: id,
            });
        } else {
            if (email) {
                subscriptionNewslettersQuery.andWhere("sn.email = :email", {
                    email: email,
                });
            }
        }

        const subscriptionNewsletters =
            await subscriptionNewslettersQuery.getMany();

        return subscriptionNewsletters;
    }

    async remove(id: string): Promise<String> {
        this.repository.delete(id);

        return id;
    }
}

export { SubscriptionNewslettersRepository };
