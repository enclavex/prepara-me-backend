import { ICreateSubscriptionPlanDTO } from "@modules/products/dtos/ICreateSubscriptionPlanDTO";
import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";
import { CreateSubscriptionPlanUseCase } from "../createSubscriptionPlan/CreateSubscriptionPlanUseCase";
import { ListSubscriptionPlanUseCase } from "./ListSubscriptionPlanUseCase";

let subscriptionPlansRepositoryInMemory: SubscriptionPlansRepositoryInMemory;
let listSubscriptionPlanUseCase: ListSubscriptionPlanUseCase;
let createSubscriptionPlanUseCase: CreateSubscriptionPlanUseCase;

describe("List Subscription Plans", () => {
    beforeEach(() => {
        subscriptionPlansRepositoryInMemory =
            new SubscriptionPlansRepositoryInMemory();
        listSubscriptionPlanUseCase = new ListSubscriptionPlanUseCase(
            subscriptionPlansRepositoryInMemory
        );
        createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(
            subscriptionPlansRepositoryInMemory
        );
    });

    it("should be able to list subscription plans", async () => {
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

        await createSubscriptionPlanUseCase.execute(subscriptionPlan2);

        const result = await listSubscriptionPlanUseCase.execute("", "", "");

        expect(result).toHaveLength(2);
    });

    it("should be able to list plan filtered by name", async () => {
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

        await createSubscriptionPlanUseCase.execute(subscriptionPlan2);

        const result = await listSubscriptionPlanUseCase.execute("One", "", "");

        expect(result).toHaveLength(1);
    });

    it("should be able to list plan filtered by status", async () => {
        const subscriptionPlan1: ICreateSubscriptionPlanDTO = {
            name: "Plan One",
            price: 100,
            status: SubscriptionPlanStatusEnum.INACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY,
        };

        await createSubscriptionPlanUseCase.execute(subscriptionPlan1);

        const subscriptionPlan2: ICreateSubscriptionPlanDTO = {
            name: "Plan Two",
            price: 100,
            status: SubscriptionPlanStatusEnum.ACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY,
        };

        await createSubscriptionPlanUseCase.execute(subscriptionPlan2);

        const result = await listSubscriptionPlanUseCase.execute(
            "",
            SubscriptionPlanStatusEnum.ACTIVE,
            ""
        );

        expect(result).toHaveLength(1);
    });

    it("should be able to list plan filtered by type", async () => {
        const subscriptionPlan1: ICreateSubscriptionPlanDTO = {
            name: "Plan One",
            price: 100,
            status: SubscriptionPlanStatusEnum.INACTIVE,
            type: SubscriptionPlanTypeEnum.SITE,
        };

        await createSubscriptionPlanUseCase.execute(subscriptionPlan1);

        const subscriptionPlan2: ICreateSubscriptionPlanDTO = {
            name: "Plan Two",
            price: 100,
            status: SubscriptionPlanStatusEnum.ACTIVE,
            type: SubscriptionPlanTypeEnum.COMPANY,
        };

        await createSubscriptionPlanUseCase.execute(subscriptionPlan2);

        const result = await listSubscriptionPlanUseCase.execute(
            "",
            "",
            SubscriptionPlanTypeEnum.COMPANY
        );

        expect(result).toHaveLength(1);
    });
});

