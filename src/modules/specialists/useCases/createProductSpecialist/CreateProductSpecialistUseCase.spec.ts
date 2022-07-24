import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { ProductsSpecialistsRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/ProductsSpecialistsRepositoryInMemory";
import { SpecialistsRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/SpecialistsRepositoryInMemory";
import { CreateProductSpecialistUseCase } from "./CreateProductSpecialistUseCase";

let productsSpecialistsRepositoryInMemory: ProductsSpecialistsRepositoryInMemory
let productsRepositoryInMemory: ProductsRepositoryInMemory
let specialistsRepositoryInMemory: SpecialistsRepositoryInMemory
let createProductSpecialistUseCase: CreateProductSpecialistUseCase

describe("Create Product Specialists", () => {
    beforeEach(() => {
        productsSpecialistsRepositoryInMemory = new ProductsSpecialistsRepositoryInMemory()
        specialistsRepositoryInMemory = new SpecialistsRepositoryInMemory()
        productsRepositoryInMemory = new ProductsRepositoryInMemory()

        createProductSpecialistUseCase = new CreateProductSpecialistUseCase(
            productsSpecialistsRepositoryInMemory,
            productsRepositoryInMemory,
            specialistsRepositoryInMemory
        )
    })

    it("should be able to create a new product specialist", async () => {
        const specialist = await specialistsRepositoryInMemory.create({
            name: "Specialist Test",
            bio: "Biography",
            status: SpecialistStatusEnum.ACTIVE,
            linkedinUrl: "www.linkedin.com/test",
            userId: ""
        })

        const product1 = await productsRepositoryInMemory.create({
            name: "Product Test",
            shortName: "Product",
            price: 100.0,
            bestSeller: ProductBestSellerEnum.NORMAL,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
        })

        const product2 = await productsRepositoryInMemory.create({
            name: "Product Test",
            shortName: "Product",
            price: 100.0,
            bestSeller: ProductBestSellerEnum.NORMAL,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
        })

        const productsSpecialist = await createProductSpecialistUseCase.execute({
            products: [product1.id, product2.id],
            specialistId: specialist.id
        })

        expect(productsSpecialist).toHaveLength(2)
    })
})