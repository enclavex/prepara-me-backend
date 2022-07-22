import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateSubscriptionPlanUseCase } from "./CreateSubscriptionPlanUseCase";

let subscriptionPlansRepositoryInMemory: SubscriptionPlansRepositoryInMemory;
let createSubscriptionPlanUseCase: CreateSubscriptionPlanUseCase;

describe("Create Subscription Plan", () => {
    beforeEach(() => {
        subscriptionPlansRepositoryInMemory =
            new SubscriptionPlansRepositoryInMemory();
        createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(
            subscriptionPlansRepositoryInMemory
        );
    });

    it("shold be able to create a new subscription plan", async () => {
        const subscriptionPlan: ICreateSubscriptionPlanDTO = {
            name: "Subscription Plan Test",
            price: 100,
            status: SubscriptionPlanStatusEnum.ACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY,
        };

        const result = await createSubscriptionPlanUseCase.execute(
            subscriptionPlan
        );

        expect(result).toHaveProperty("id");
    });

    it("shold be able to update a subscription plan", async () => {
        const subscriptionPlan: ICreateSubscriptionPlanDTO = {
            name: "Subscription Plan Test",
            price: 100,
            status: SubscriptionPlanStatusEnum.ACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY,
        };

        const resultCreated = await createSubscriptionPlanUseCase.execute(
            subscriptionPlan
        );

        expect(resultCreated).toHaveProperty("id");

        const subscriptionPlanUpdated: ICreateSubscriptionPlanDTO = {
            name: "Subscription Plan Test Updated",
            price: resultCreated.price,
            status: resultCreated.status,
            type: resultCreated.type,
            id: resultCreated.id
        };

        const resultUpdated = await createSubscriptionPlanUseCase.execute(
            subscriptionPlanUpdated
        );

        expect(resultUpdated.name).toBe("Subscription Plan Test Updated");
        expect(resultUpdated.id).toBe(resultCreated.id);
    });

    it("should not be able to create a subscription plan without a name", async () => {
        expect(async () => {
            const subscriptionPlan: ICreateSubscriptionPlanDTO = {
                name: "",
                price: 100,
                status: SubscriptionPlanStatusEnum.ACTIVE,
                type: SubscriptionPlanTypeEnum.COMPANY,
            };
    
            await createSubscriptionPlanUseCase.execute(
                subscriptionPlan
            );
        }).rejects.toBeInstanceOf(AppError);
    });
});

