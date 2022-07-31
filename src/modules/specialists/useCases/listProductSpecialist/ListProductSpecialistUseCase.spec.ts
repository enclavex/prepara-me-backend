import { ICreateProductSpecialistDTO } from "@modules/specialists/dtos/ICreateProductSpecialistDTO";
import { ProductsSpecialistsRepositoryInMemory } from "@modules/specialists/repositories/in-memory/ProductsSpecialistsRepositoryInMemory";
import { CreateProductSpecialistUseCase } from "../createProductSpecialist/CreateProductSpecialistUseCase";
import { ListProductSpecialistUseCase } from "./ListProductSpecialistUseCase";

let productsSpecialistsRepositoryInMemory: ProductsSpecialistsRepositoryInMemory;
let createProductSpecialistUseCase: CreateProductSpecialistUseCase;
let listProductSpecialistUseCase: ListProductSpecialistUseCase;

describe("List Products Specialists ", () => {
    beforeEach(() => {
        productsSpecialistsRepositoryInMemory =
            new ProductsSpecialistsRepositoryInMemory();
        createProductSpecialistUseCase = new CreateProductSpecialistUseCase(
            productsSpecialistsRepositoryInMemory
        );
        listProductSpecialistUseCase = new ListProductSpecialistUseCase(
            productsSpecialistsRepositoryInMemory
        );
    });

    it("should be able to list a product specialist", async () => {
        const productSpecialist: ICreateProductSpecialistDTO = {
            productId: "123",
            specialistId: "123"
        };

        await createProductSpecialistUseCase.execute(productSpecialist);

        const result = await listProductSpecialistUseCase.execute({
            productId: "",
            specialistId: "",
            id: ""
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list a product specialist filtered by product", async () => {
        const productSpecialist1: ICreateProductSpecialistDTO = {
            productId: "123",
            specialistId: "123"
        };

        await createProductSpecialistUseCase.execute(productSpecialist1);

        const productSpecialist2: ICreateProductSpecialistDTO = {
            productId: "321",
            specialistId: "321"
        };

        await createProductSpecialistUseCase.execute(productSpecialist2);

        const result = await listProductSpecialistUseCase.execute({
            productId: "123",
            specialistId: "",
            id: ""
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list a product specialist filtered by specialist", async () => {
        const productSpecialist1: ICreateProductSpecialistDTO = {
            productId: "123",
            specialistId: "123"
        };

        await createProductSpecialistUseCase.execute(productSpecialist1);

        const productSpecialist2: ICreateProductSpecialistDTO = {
            productId: "321",
            specialistId: "321"
        };

        await createProductSpecialistUseCase.execute(productSpecialist2);

        const result = await listProductSpecialistUseCase.execute({
            productId: "",
            specialistId: "123",
            id: ""
        });

        expect(result).toHaveLength(1);
    });
});
