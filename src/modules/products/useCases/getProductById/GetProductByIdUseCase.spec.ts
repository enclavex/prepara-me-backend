import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { GetProductByIdUseCase } from "./GetProductByIdUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;
let getProductByIdController: GetProductByIdUseCase;

describe("get product", () => {
    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        getProductByIdController = new GetProductByIdUseCase(
            productsRepositoryInMemory
        );
        createProductUseCase = new CreateProductUseCase(
            productsRepositoryInMemory
        );
    });

    it("should be able to list available products", async () => {
        const product1: ICreateProductDTO = {
            name: "Product Test One",
            shortName: "One",
            price: 100.0,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
            bestSeller: ProductBestSellerEnum.NORMAL,
        };

        const productCreated = await createProductUseCase.execute(product1);

        const result = await getProductByIdController.execute(
            productCreated.id
        );

        expect(result).toHaveProperty("id")
    });
});
