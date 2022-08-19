import { ICreateSubscriptionNewsletterDTO } from "@modules/accounts/dtos/ICreateSubscriptionNewsletterDTO";
import { ISubscriptionNewsletterResponseDTO } from "@modules/accounts/dtos/ISubscriptionNewsletterResponseDTO";
import { SubscriptionNewsletter } from "@modules/accounts/infra/typeorm/entities/SubscriptionNewsletter";
import { ISubscriptionNewslettersRepository } from "../ISubcriptionNewslettersRepository";

class SubscriptionNewslettersRepositoryInMemory
    implements ISubscriptionNewslettersRepository
{
    subscriptionNewsletters: SubscriptionNewsletter[] = [];

    async create({
        id,
        email,
    }: ICreateSubscriptionNewsletterDTO): Promise<SubscriptionNewsletter> {
        const subscriptionNewsletter = new SubscriptionNewsletter(email, id);

        this.subscriptionNewsletters.push(subscriptionNewsletter);

        return subscriptionNewsletter;
    }

    async find({ id, email }): Promise<ISubscriptionNewsletterResponseDTO[]> {
        let subscriptionNewsletters = this.subscriptionNewsletters;

        if (id) {
            subscriptionNewsletters = subscriptionNewsletters.filter(
                (subscriptionNewsletter) => {
                    return subscriptionNewsletter.id === id;
                }
            );
        } else {
            if (email) {
                subscriptionNewsletters = subscriptionNewsletters.filter(
                    (subscriptionNewsletter) => {
                        return subscriptionNewsletter.email === email;
                    }
                );
            }
        }

        return subscriptionNewsletters;
    }

    async remove(id: string): Promise<String> {
        this.subscriptionNewsletters = this.subscriptionNewsletters.filter(
            (subscriptionNewsletter) => {
                return id !== subscriptionNewsletter.id;
            }
        );

        return id;
    }
}

export { SubscriptionNewslettersRepositoryInMemory };
