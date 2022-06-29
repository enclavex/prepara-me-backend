import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO"
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum"
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum"
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum"
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory"
import { CreateProductUseCase } from "@modules/products/useCases/createProduct/CreateProductUseCase"
import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO"
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum"
import { ProductSpecialistRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/ProductSpecialistRepositoryInMemory"
import { SpecialistRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/SpecialistsRepositoryInMemory"
import { CreateProductSpecialistUseCase } from "../createProductSpecialist/CreateProductSpecialistUseCase"
import { CreateSpecialistUseCase } from "../createSpecialist/CreateSpecialistUseCase"
import { ListSpecialistsByProductUseCase } from "./ListSpecialistsByProductUseCase"

let specialistsRepositoryInMemory: SpecialistRepositoryInMemory
let productSpecialistRepositoryInMemory: ProductSpecialistRepositoryInMemory
let productRepositoryInMemory: ProductsRepositoryInMemory
let listSpecialistsByProductUseCase: ListSpecialistsByProductUseCase
let createSpecialistUseCase: CreateSpecialistUseCase
let createProductUseCase: CreateProductUseCase
let createProductSpecialistUseCase: CreateProductSpecialistUseCase

describe("List Specialists", () => {
    beforeAll(() => {
        specialistsRepositoryInMemory = new SpecialistRepositoryInMemory()
        productSpecialistRepositoryInMemory = new ProductSpecialistRepositoryInMemory()
        productRepositoryInMemory = new ProductsRepositoryInMemory()
        createSpecialistUseCase = new CreateSpecialistUseCase(specialistsRepositoryInMemory)
        createProductSpecialistUseCase = new CreateProductSpecialistUseCase(
            productSpecialistRepositoryInMemory,
            productRepositoryInMemory,
            specialistsRepositoryInMemory
        )
        createProductUseCase = new CreateProductUseCase(productRepositoryInMemory)
        listSpecialistsByProductUseCase = new ListSpecialistsByProductUseCase(
            productSpecialistRepositoryInMemory,
            specialistsRepositoryInMemory
        )
    })

    it("should be able to list specialists by product", async () => {
        const specialist1: ICreateSpecialistDTO = {
            name: "Specialist Test",
            bio: "Biography",
            status: SpecialistStatusEnum.ACTIVE,
            linkedinUrl: "www.linkedin.com/test",
            userId: "1234"
        }

        await createSpecialistUseCase.execute(specialist1)
        
        const specialist2: ICreateSpecialistDTO = {
            name: "Specialist Test 2",
            bio: "Biography 2",
            status: SpecialistStatusEnum.ACTIVE,
            linkedinUrl: "www.linkedin.com/test",
            userId: "1234"
        }
        const specialistInserted =  await createSpecialistUseCase.execute(specialist2)

        const product: ICreateProductDTO = {
            name: "Product Test",
            shortName: "Product",
            price: 100.0,
            bestSeller: ProductBestSellerEnum.NORMAL,
            status: ProductStatusEnum.ACTIVE,
            type: ProductTypeEnum.SCHEDULED,
        };

        const productInserted = await createProductUseCase.execute(product);

        await createProductSpecialistUseCase.execute({
            products: [productInserted.id],
            specialistId: specialistInserted.id
        })

        const result = await listSpecialistsByProductUseCase.execute({
            productId: productInserted.id
        })

        expect(result).toHaveLength(1)
    })
})