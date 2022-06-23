import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";

import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { ListProductAvailableUseCase } from "./ListProductAvailableUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let listProductAvailableUseCase: ListProductAvailableUseCase;
let createProductUseCase: CreateProductUseCase;

describe("List Products Available", () => {
    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        listProductAvailableUseCase = new ListProductAvailableUseCase(
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

        await createProductUseCase.execute(product1);

        const product2: ICreateProductDTO = {
            name: "Product Test Two",
            shortName: "Two",
            price: 100.0,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
            bestSeller: ProductBestSellerEnum.NORMAL,
        };

        await createProductUseCase.execute(product2);

        const product3: ICreateProductDTO = {
            name: "Product Test Three",
            shortName: "Three",
            price: 100.0,
            status: ProductStatusEnum.INACTIVE,
            type: ProductTypeEnum.SCHEDULED,
            bestSeller: ProductBestSellerEnum.NORMAL,
        };

        await createProductUseCase.execute(product3);

        const result = await listProductAvailableUseCase.execute();

        expect(result).toHaveLength(2);
    });
});
