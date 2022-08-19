import { ICreateSubscriptionNewsletterDTO } from "@modules/accounts/dtos/ICreateSubscriptionNewsletterDTO";
import { SubscriptionNewslettersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/SubscriptionNewslettersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateSubscriptionNewsletterUseCase } from "./CreateSubscriptionNewsletterUseCase";

let subscriptionNewsletterRepositoryInMemory: SubscriptionNewslettersRepositoryInMemory;
let createSubscriptionNewsletterUseCase: CreateSubscriptionNewsletterUseCase;
describe("Create Subscription Newsletter", () => {
    beforeEach(() => {
        subscriptionNewsletterRepositoryInMemory =
            new SubscriptionNewslettersRepositoryInMemory();
        createSubscriptionNewsletterUseCase =
            new CreateSubscriptionNewsletterUseCase(
                subscriptionNewsletterRepositoryInMemory
            );
    });

    it("should be able to create a new subscription newsletter", async () => {
        const subscriptionNewsletter: ICreateSubscriptionNewsletterDTO = {
            email: "user@test.com",
        };

        const result = await createSubscriptionNewsletterUseCase.execute(subscriptionNewsletter);

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a subscription newsletter with no email", async () => {
        expect(async () => {
            const subscriptionNewsletter: ICreateSubscriptionNewsletterDTO = {
                email: "",
            };

            await createSubscriptionNewsletterUseCase.execute(subscriptionNewsletter);
        }).rejects.toBeInstanceOf(AppError);
    });
});
