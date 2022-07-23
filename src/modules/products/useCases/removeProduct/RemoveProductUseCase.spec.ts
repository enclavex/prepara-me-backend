import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { ListProductUseCase } from "../listProduct/ListProductUseCase";
import { RemoveProductUseCase } from "./RemoveProductUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let listProductUseCase: ListProductUseCase;
let createProductUseCase: CreateProductUseCase;
let removeProductUseCase: RemoveProductUseCase;

describe("Remove Products", () => {
    beforeEach(() => {
        productsRepositoryInMemory = new ProductsRepositoryInMemory();
        listProductUseCase = new ListProductUseCase(productsRepositoryInMemory);
        createProductUseCase = new CreateProductUseCase(
            productsRepositoryInMemory
        );
        removeProductUseCase = new RemoveProductUseCase(
            productsRepositoryInMemory
        );
    });

    it("should be able to delete a product", async () => {
        const product1: ICreateProductDTO = {
            name: "Product One",
            bestSeller: ProductBestSellerEnum.BEST_SELLER,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
            price: 10,
            shortName: "One",
        };

        await createProductUseCase.execute(product1);

        const product2: ICreateProductDTO = {
            name: "Product Two",
            bestSeller: ProductBestSellerEnum.BEST_SELLER,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
            price: 10,
            shortName: "One",
        };

        const productCreated = await createProductUseCase.execute(product2);

        await removeProductUseCase.execute(productCreated.id);

        const result = await listProductUseCase.execute({
            name: "",
            shortName: "",
            status: "",
            type: "",
            bestSeller: "",
            id: "",
        });

        expect(result).toHaveLength(1);
    });
});
