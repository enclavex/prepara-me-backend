import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UserProductsAvailableRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserProductsAvailableRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;
let companySubscriptionPlansRepository: CompanySubscriptionPlansRepositoryInMemory;
let companyEmployeesRepository: CompanyEmployeesRepositoryInMemory;
let subscriptionPlansRepository: SubscriptionPlansRepositoryInMemory;
let userProductsAvailableRepository: UserProductsAvailableRepositoryInMemory;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        new UserProductsAvailableRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            companySubscriptionPlansRepository,
            companyEmployeesRepository,
            subscriptionPlansRepository,
            userProductsAvailableRepository
        );
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider
        );
    });

    it("should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            username: "User",
            email: "user@test.com",
            password: "1234",
            documentId: "00000000000",
            active: UserStatusEnum.ACTIVE,
            type: UserTypeEnum.USER,
        };

        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate a non existent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "user@test.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate a user with wrong password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                username: "User",
                email: "user@test.com",
                password: "1234",
                documentId: "00000000000",
                active: UserStatusEnum.ACTIVE,
                type: UserTypeEnum.USER,
            };

            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPass",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
