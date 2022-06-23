import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";

import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { ListProductAvailableBestSellerUseCase } from "./ListProductAvailableBestSellerUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let listProductAvailableBestSellerUseCase: ListProductAvailableBestSellerUseCase;
let createProductUseCase: CreateProductUseCase;

describe("List Products Available", () => {
    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        listProductAvailableBestSellerUseCase =
            new ListProductAvailableBestSellerUseCase(
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
            bestSeller: ProductBestSellerEnum.BEST_SELLER,
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

        const result = await listProductAvailableBestSellerUseCase.execute();

        expect(result).toHaveLength(1);
    });
});
