import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductsRepositoryInMemory } from "@modules/products/repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "@modules/products/useCases/createProduct/CreateProductUseCase";
import { ICreateSpecialistDTO } from "@modules/specialists/dtos/ICreateSpecialistDTO";
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { ProductsSpecialistsRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/ProductsSpecialistsRepositoryInMemory";
import { SpecialistsRepositoryInMemory } from "@modules/specialists/infra/typeorm/repositories/in-memory/SpecialistsRepositoryInMemory";
import { CreateProductSpecialistUseCase } from "../createProductSpecialist/CreateProductSpecialistUseCase";
import { CreateSpecialistUseCase } from "../createSpecialist/CreateSpecialistUseCase";
import { ListSpecialistsByProductUseCase } from "./ListSpecialistsByProductUseCase";

let specialistsRepositoryInMemory: SpecialistsRepositoryInMemory;
let productsSpecialistsRepositoryInMemory: ProductsSpecialistsRepositoryInMemory;
let productRepositoryInMemory: ProductsRepositoryInMemory;
let listSpecialistsByProductUseCase: ListSpecialistsByProductUseCase;
let createSpecialistUseCase: CreateSpecialistUseCase;
let createProductUseCase: CreateProductUseCase;
let createProductSpecialistUseCase: CreateProductSpecialistUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
describe("List Specialists", () => {
    beforeAll(() => {
        specialistsRepositoryInMemory = new SpecialistsRepositoryInMemory();
        productsSpecialistsRepositoryInMemory =
            new ProductsSpecialistsRepositoryInMemory();
        productRepositoryInMemory = new ProductsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createSpecialistUseCase = new CreateSpecialistUseCase(
            specialistsRepositoryInMemory
        );
        createProductSpecialistUseCase = new CreateProductSpecialistUseCase(
            productsSpecialistsRepositoryInMemory,
            productRepositoryInMemory,
            specialistsRepositoryInMemory
        );
        createProductUseCase = new CreateProductUseCase(
            productRepositoryInMemory
        );
        listSpecialistsByProductUseCase = new ListSpecialistsByProductUseCase(
            productsSpecialistsRepositoryInMemory,
            specialistsRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to list specialists by product", async () => {
        const user: ICreateUserDTO = {
            documentId: "123",
            email: "teste@teste.com",
            name: "teste",
            password: "123",
            type: UserTypeEnum.USER,
            active: UserStatusEnum.ACTIVE,
            username: "teste",
        };

        const userCreated   = await createUserUseCase.execute(user)

        const specialist1: ICreateSpecialistDTO = {
            name: "Specialist Test",
            bio: "Biography",
            status: SpecialistStatusEnum.ACTIVE,
            linkedinUrl: "www.linkedin.com/test",
            userId: userCreated.id,
        };

        await createSpecialistUseCase.execute(specialist1);

        const specialist2: ICreateSpecialistDTO = {
            name: "Specialist Test 2",
            bio: "Biography 2",
            status: SpecialistStatusEnum.ACTIVE,
            linkedinUrl: "www.linkedin.com/test",
            userId: userCreated.id,
        };
        
        const specialistInserted = await createSpecialistUseCase.execute(
            specialist2
        );

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
            specialistId: specialistInserted.id,
        });

        const result = await listSpecialistsByProductUseCase.execute({
            productId: productInserted.id,
        });

        expect(result).toHaveLength(1);
    });
});

