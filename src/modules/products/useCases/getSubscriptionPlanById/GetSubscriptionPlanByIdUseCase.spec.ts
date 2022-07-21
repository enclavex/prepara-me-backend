import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";
import { CreateSubscriptionPlanUseCase } from "../createSubscriptionPlan/CreateSubscriptionPlanUseCase";
import { GetSubscriptionPlanByIdUseCase } from "./GetSubscriptionPlanByIdUseCase";

let subscriptionPlansRepositoryInMemory: SubscriptionPlansRepositoryInMemory;
let createSubscriptionPlanUseCase: CreateSubscriptionPlanUseCase;
let getSubscriptionPlanByIdUseCase: GetSubscriptionPlanByIdUseCase;

describe("get subscription plan by id", () => {
    beforeEach(() => {
        subscriptionPlansRepositoryInMemory = new SubscriptionPlansRepositoryInMemory();
        getSubscriptionPlanByIdUseCase = new GetSubscriptionPlanByIdUseCase(
            subscriptionPlansRepositoryInMemory
        );
        createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(
            subscriptionPlansRepositoryInMemory
        );
    });

    it("should be able to get subscription plan by id", async () => {
        const subscriptionPlan: ICreateSubscriptionPlanDTO = {
            name: "Plan Test One",
            price: 100,
            status: SubscriptionPlanStatusEnum.ACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY
        };

        const planCreated = await createSubscriptionPlanUseCase.execute(subscriptionPlan);

        const result = await getSubscriptionPlanByIdUseCase.execute(
            planCreated.id
        );

        expect(result).toHaveProperty("id")
    });
});
