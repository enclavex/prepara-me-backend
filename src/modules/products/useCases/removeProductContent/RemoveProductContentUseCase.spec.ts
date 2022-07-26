import { ICreateProductContentDTO } from "@modules/products/dtos/ICreateProductContentDTO";
import { ProductContentsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductContentsRepositoryInMemory";
import { CreateProductContentUseCase } from "../createProductContent/CreateProductContentUseCase";
import { RemoveProductContentUseCase } from "./RemoveProductContentUseCase";

let createProductContentUseCase: CreateProductContentUseCase;
let productContentRepositoryInMemory: ProductContentsRepositoryInMemory;
let removeProductContentUseCase: RemoveProductContentUseCase;

describe("Remove Product Content", () => {
    beforeEach(() => {
        productContentRepositoryInMemory =
            new ProductContentsRepositoryInMemory();
        createProductContentUseCase =
            new CreateProductContentUseCase(
                productContentRepositoryInMemory
            );
        removeProductContentUseCase =
            new RemoveProductContentUseCase(
                productContentRepositoryInMemory
            );
    });

    it("should be able to delete a company subscription plan", async () => {
        const productContentPlan1: ICreateProductContentDTO = {
            content: "teste",
            productId: "123"
        };

        await createProductContentUseCase.execute(
            productContentPlan1
        );

        const productContentPlan2: ICreateProductContentDTO = {
            content: "teste",
            productId: "123"
        };

        const productContentPlanCreated =
            await createProductContentUseCase.execute(
                productContentPlan2
            );

        const idRemoved = await removeProductContentUseCase.execute(
            productContentPlanCreated.id
        );

        expect(idRemoved).toBe(productContentPlanCreated.id)
    });
});
