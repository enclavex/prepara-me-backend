import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRealocatedEnum } from "@modules/accounts/enums/UserRealocatedEnum";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UserProductsAvailableRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserProductsAvailableRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListUserUseCase } from "./ListUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUserUseCase: ListUserUseCase;
let createUserUseCase: CreateUserUseCase;
let companySubscriptionPlansRepository: CompanySubscriptionPlansRepositoryInMemory;
let companyEmployeesRepository: CompanyEmployeesRepositoryInMemory;
let subscriptionPlansRepository: SubscriptionPlansRepositoryInMemory;
let userProductsAvailableRepository: UserProductsAvailableRepositoryInMemory;

describe("List User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        listUserUseCase = new ListUserUseCase(usersRepositoryInMemory);
        companySubscriptionPlansRepository =
            new CompanySubscriptionPlansRepositoryInMemory();
        companyEmployeesRepository = new CompanyEmployeesRepositoryInMemory();
        subscriptionPlansRepository = new SubscriptionPlansRepositoryInMemory();
        userProductsAvailableRepository =
            new UserProductsAvailableRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            companySubscriptionPlansRepository,
            companyEmployeesRepository,
            subscriptionPlansRepository,
            userProductsAvailableRepository
        );
    });

    it("should be able to list users", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "",
            status: "",
            type: "",
            documentId: "",
            realocated: "",
            laborRiskAlert: "",
        });

        expect(result).toHaveLength(2);
    });

    it("should be able to list users filtered by name", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "One",
            status: "",
            type: "",
            documentId: "",
            realocated: "",
            laborRiskAlert: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by email", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "user2@user.com",
            id: "",
            name: "",
            status: "",
            type: "",
            documentId: "",
            realocated: "",
            laborRiskAlert: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by status", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            status: UserStatusEnum.INACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "",
            status: UserStatusEnum.INACTIVE,
            type: "",
            documentId: "",
            realocated: "",
            laborRiskAlert: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by type", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.ADMIN,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            status: UserStatusEnum.INACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "",
            status: "",
            type: UserTypeEnum.USER,
            documentId: "",
            realocated: "",
            laborRiskAlert: "",
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by id", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            status: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.ADMIN,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            status: UserStatusEnum.INACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One",
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        const userCreated = await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: userCreated.id,
            name: "",
            status: "",
            type: "",
            documentId: "",
            realocated: "",
            laborRiskAlert: "",
        });

        expect(result).toHaveLength(1);
    });
});

