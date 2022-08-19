import { ICreateSubscriptionNewsletterDTO } from "../dtos/ICreateSubscriptionNewsletterDTO";
import { ISubscriptionNewsletterResponseDTO } from "../dtos/ISubscriptionNewsletterResponseDTO";
import { SubscriptionNewsletter } from "../infra/typeorm/entities/SubscriptionNewsletter";

interface IRequestFind {
    id?: string;
    email?: string;
}

interface ISubscriptionNewslettersRepository {
    create(data: ICreateSubscriptionNewsletterDTO): Promise<SubscriptionNewsletter>;
    find(data: IRequestFind): Promise<ISubscriptionNewsletterResponseDTO[]>;
    remove(id: string): Promise<String>;
}

export { ISubscriptionNewslettersRepository };

