import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRealocatedEnum } from "@modules/accounts/enums/UserRealocatedEnum";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UserProductsAvailableRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserProductsAvailableRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let companySubscriptionPlansRepository: CompanySubscriptionPlansRepositoryInMemory;
let companyEmployeesRepository: CompanyEmployeesRepositoryInMemory;
let subscriptionPlansRepository: SubscriptionPlansRepositoryInMemory;
let userProductsAvailableRepository: UserProductsAvailableRepositoryInMemory;


describe("Create User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            companySubscriptionPlansRepository,
            companyEmployeesRepository,
            subscriptionPlansRepository,
            userProductsAvailableRepository
        );
    });

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            username: "User",
            email: "user@test.com",
            password: "1234",
            documentId: "00000000000",
            status: UserStatusEnum.ACTIVE,
            type: UserTypeEnum.USER,
            companyId: '123',
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        const result = await createUserUseCase.execute(user);

        expect(result).toHaveProperty("id");
        expect(result.password).not.toBe("1234");
    });

    it("should not be able to create a user with no documentId", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                username: "User",
                email: "user@test.com",
                password: "1234",
                documentId: "",
                status: UserStatusEnum.ACTIVE,
                type: UserTypeEnum.USER,
                companyId: '123',
                realocated: UserRealocatedEnum.NOT_REALOCATED,
                expiresDate: new Date(),
                periodTest: new Date(),
            };

            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a user with no name", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "",
                username: "User",
                email: "user@test.com",
                password: "1234",
                documentId: "000000",
                status: UserStatusEnum.ACTIVE,
                type: UserTypeEnum.USER,
                companyId: '123',
                realocated: UserRealocatedEnum.NOT_REALOCATED,
                expiresDate: new Date(),
                periodTest: new Date(),
            };

            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a user with no e-mail", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                username: "User",
                email: "",
                password: "1234",
                documentId: "000000",
                status: UserStatusEnum.ACTIVE,
                type: UserTypeEnum.USER,
                companyId: '123',
                realocated: UserRealocatedEnum.NOT_REALOCATED,
                expiresDate: new Date(),
                periodTest: new Date(),
            };

            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a user with no password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                username: "User",
                email: "user@test.com",
                password: "",
                documentId: "000000",
                status: UserStatusEnum.ACTIVE,
                type: UserTypeEnum.USER,
                companyId: '123',
                realocated: UserRealocatedEnum.NOT_REALOCATED,
                expiresDate: new Date(),
                periodTest: new Date(),
            };

            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    });
});
