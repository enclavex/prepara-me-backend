import { ICreateSubscriptionPlanProductDTO } from "@modules/products/dtos/ICreateSubscriptionPlanProductDTO";
import { SubscriptionPlanProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlanProductsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateSubscriptionPlanProductUseCase } from "./CreateSubscriptionPlanProductUseCase";

let subscriptionPlanProductsRepositoryInMemory: SubscriptionPlanProductsRepositoryInMemory
let createSubscriptionPlanProductUseCase: CreateSubscriptionPlanProductUseCase

describe("Create Subscription Plan Product", () => {
    beforeEach(() => {
        subscriptionPlanProductsRepositoryInMemory = new SubscriptionPlanProductsRepositoryInMemory();
        createSubscriptionPlanProductUseCase = new CreateSubscriptionPlanProductUseCase(
            subscriptionPlanProductsRepositoryInMemory
        );
    });

    it("shold be able to create a new subscription plan product", async () => {
        const subscriptionPlanProduct: ICreateSubscriptionPlanProductDTO = {
            subscriptionPlanId: "123",
            productId: "123",
            availableQuantity: 123
        };

        const result = await createSubscriptionPlanProductUseCase.execute(subscriptionPlanProduct);

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a subscription plan product without a subscription plan", async () => {
        expect(async () => {
            const subscriptionPlanProduct: ICreateSubscriptionPlanProductDTO = {
                subscriptionPlanId: "",
                productId: "123",
                availableQuantity: 123
            };
    
            await createSubscriptionPlanProductUseCase.execute(subscriptionPlanProduct);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a subscription plan product without a product", async () => {
        expect(async () => {
            const subscriptionPlanProduct: ICreateSubscriptionPlanProductDTO = {
                subscriptionPlanId: "123",
                productId: "",
                availableQuantity: 123
            };
    
            await createSubscriptionPlanProductUseCase.execute(subscriptionPlanProduct);
        }).rejects.toBeInstanceOf(AppError);
    });
})