import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";
import { CreateSubscriptionPlanUseCase } from "../createSubscriptionPlan/CreateSubscriptionPlanUseCase";
import { ListSubscriptionPlanUseCase } from "../listSubscriptionPlan/ListSubscriptionPlanUseCase";
import { RemoveSubscriptionPlanUseCase } from "./RemoveSubscriptionPlanUseCase";

let subscriptionPlansRepositoryInMemory: SubscriptionPlansRepositoryInMemory;
let listSubscriptionPlanUseCase: ListSubscriptionPlanUseCase;
let createSubscriptionPlanUseCase: CreateSubscriptionPlanUseCase;
let removeSubscriptionPlanUseCase: RemoveSubscriptionPlanUseCase;

describe("Remove Subscription Plans", () => {
    beforeEach(() => {
        subscriptionPlansRepositoryInMemory =
            new SubscriptionPlansRepositoryInMemory();
        listSubscriptionPlanUseCase = new ListSubscriptionPlanUseCase(
            subscriptionPlansRepositoryInMemory
        );
        createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(
            subscriptionPlansRepositoryInMemory
        );
        removeSubscriptionPlanUseCase = new RemoveSubscriptionPlanUseCase(
            subscriptionPlansRepositoryInMemory
        );
    });

    it("should be able to delete a subscription plans", async () => {
        const subscriptionPlan1: ICreateSubscriptionPlanDTO = {
            name: "Plan One",
            price: 100,
            status: SubscriptionPlanStatusEnum.ACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY,
        };

        await createSubscriptionPlanUseCase.execute(subscriptionPlan1);

        const subscriptionPlan2: ICreateSubscriptionPlanDTO = {
            name: "Plan Two",
            price: 100,
            status: SubscriptionPlanStatusEnum.ACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY,
        };

        const subscriptionPlanCreated = await createSubscriptionPlanUseCase.execute(subscriptionPlan2);

        await removeSubscriptionPlanUseCase.execute(subscriptionPlanCreated.id);

        const result = await listSubscriptionPlanUseCase.execute("", "", "");

        expect(result).toHaveLength(1);
    });
})