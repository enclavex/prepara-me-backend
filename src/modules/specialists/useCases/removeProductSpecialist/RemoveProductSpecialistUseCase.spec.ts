import { ICreateProductSpecialistDTO } from "@modules/specialists/dtos/ICreateProductSpecialistDTO";
import { ProductsSpecialistsRepositoryInMemory } from "@modules/specialists/repositories/in-memory/ProductsSpecialistsRepositoryInMemory";
import { CreateProductSpecialistUseCase } from "../createProductSpecialist/CreateProductSpecialistUseCase";
import { RemoveProductSpecialistUseCase } from "./RemoveProductSpecialistUseCase";

let createProductSpecialistUseCase: CreateProductSpecialistUseCase;
let productsSpecialistRepositoryInMemory: ProductsSpecialistsRepositoryInMemory;
let removeProductSpecialistUseCase: RemoveProductSpecialistUseCase;

describe("Remove Product Specialist", () => {
    beforeEach(() => {
        productsSpecialistRepositoryInMemory =
            new ProductsSpecialistsRepositoryInMemory();
        createProductSpecialistUseCase =
            new CreateProductSpecialistUseCase(
                productsSpecialistRepositoryInMemory
            );
        removeProductSpecialistUseCase =
            new RemoveProductSpecialistUseCase(
                productsSpecialistRepositoryInMemory
            );
    });

    it("should be able to delete a company subscription plan", async () => {
        const productSpecialistPlan1: ICreateProductSpecialistDTO = {
            productId: "123",
            specialistId: "123"
        };

        await createProductSpecialistUseCase.execute(
            productSpecialistPlan1
        );

        const productSpecialistPlan2: ICreateProductSpecialistDTO = {
            productId: "123",
            specialistId: "123"
        };

        const productSpecialistPlanCreated =
            await createProductSpecialistUseCase.execute(
                productSpecialistPlan2
            );

        const idRemoved = await removeProductSpecialistUseCase.execute(
            productSpecialistPlanCreated.id
        );

        expect(idRemoved).toBe(productSpecialistPlanCreated.id)
    });
});
