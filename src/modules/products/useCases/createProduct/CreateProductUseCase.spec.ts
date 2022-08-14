import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateProductUseCase } from "./CreateProductUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;

describe("Create Product", () => {
    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        createProductUseCase = new CreateProductUseCase(
            productsRepositoryInMemory
        );
    });

    it("shold be able to create a new product", async () => {
        const product: ICreateProductDTO = {
            name: "Product Test",
            shortName: "Product",
            price: 100.0,
            duration: 1,
            bestSeller: ProductBestSellerEnum.NORMAL,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
        };

        const result = await createProductUseCase.execute(product);

        expect(result).toHaveProperty("id");
    });

    it("should not be able to create a product without a name", async () => {
        expect(async () => {
            const product: ICreateProductDTO = {
                name: "",
                shortName: "Product",
                price: 100.0,
                duration: 1,
                bestSeller: ProductBestSellerEnum.NORMAL,
                status: ProductStatusEnum.ACTIVE,
                type: ProductTypeEnum.SCHEDULED,
            };

            await createProductUseCase.execute(product);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a product without a short name", async () => {
        expect(async () => {
            const product: ICreateProductDTO = {
                name: "Product Test",
                shortName: "",
                price: 100.0,
                duration: 1,
                bestSeller: ProductBestSellerEnum.NORMAL,
                status: ProductStatusEnum.ACTIVE,
                type: ProductTypeEnum.SCHEDULED,
            };

            await createProductUseCase.execute(product);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a product without price", async () => {
        expect(async () => {
            const product: ICreateProductDTO = {
                name: "Product Test",
                shortName: "Product",
                price: null,
                duration: 1,
                bestSeller: ProductBestSellerEnum.NORMAL,
                status: ProductStatusEnum.ACTIVE,
                type: ProductTypeEnum.SCHEDULED,
            };

            await createProductUseCase.execute(product);
        }).rejects.toBeInstanceOf(AppError);
    });
});

