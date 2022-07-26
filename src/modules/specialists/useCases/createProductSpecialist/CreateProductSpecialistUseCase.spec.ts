import { ProductsSpecialistsRepositoryInMemory } from "@modules/specialists/repositories/in-memory/ProductsSpecialistsRepositoryInMemory";
import { CreateProductSpecialistUseCase } from "./CreateProductSpecialistUseCase";

let productsSpecialistsRepositoryInMemory: ProductsSpecialistsRepositoryInMemory;
let createProductSpecialistUseCase: CreateProductSpecialistUseCase;

describe("Create Product Specialists", () => {
    beforeEach(() => {
        productsSpecialistsRepositoryInMemory =
            new ProductsSpecialistsRepositoryInMemory();
        createProductSpecialistUseCase = new CreateProductSpecialistUseCase(
            productsSpecialistsRepositoryInMemory
        );
    });

    it("should be able to create a new product specialist", async () => {
        const productsSpecialist = await createProductSpecialistUseCase.execute(
            {
                productId: "123",
                specialistId: "123",
            }
        );

        expect(productsSpecialist).toHaveProperty("id");
    });
});

