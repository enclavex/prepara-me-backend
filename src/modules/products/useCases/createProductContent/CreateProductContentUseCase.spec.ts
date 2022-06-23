import { ICreateProductContentDTO } from "@modules/products/dtos/ICreateProductContentDTO";
import { ProductContentsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductContentsRepositoryInMemory";

import { CreateProductContentUseCase } from "./CreateProductContentUseCase";

let productContentsRepositoryInMemory: ProductContentsRepositoryInMemory;
let createProductContentsUseCase: CreateProductContentUseCase;

describe("Create Product Content", () => {
    beforeEach(() => {
        productContentsRepositoryInMemory =
            new ProductContentsRepositoryInMemory();
        createProductContentsUseCase = new CreateProductContentUseCase(
            productContentsRepositoryInMemory
        );
    });

    it("should be able to create a new product content", async () => {
        const productContent: ICreateProductContentDTO = {
            content: "Teste 01",
            productId: "01",
        };

        const result = await createProductContentsUseCase.execute(
            productContent
        );

        expect(result).toHaveProperty("id");
    });
});
