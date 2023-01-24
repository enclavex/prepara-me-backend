import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRealocatedEnum } from "@modules/accounts/enums/UserRealocatedEnum";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UserProductsAvailableRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserProductsAvailableRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { TokenExpiredError } from "jsonwebtoken";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let userTokensRepositoryinMemory: UserTokensRepositoryInMemory;
let refreshTokenUseCase: RefreshTokenUseCase;
let dateProvider: DayjsDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let companySubscriptionPlansRepository: CompanySubscriptionPlansRepositoryInMemory;
let companyEmployeesRepository: CompanyEmployeesRepositoryInMemory;
let subscriptionPlansRepository: SubscriptionPlansRepositoryInMemory;
let userProductsAvailableRepository: UserProductsAvailableRepositoryInMemory;

describe("Refresh Token", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            companySubscriptionPlansRepository,
            companyEmployeesRepository,
            subscriptionPlansRepository,
            userProductsAvailableRepository
        );
        userTokensRepositoryinMemory = new UserTokensRepositoryInMemory();
        refreshTokenUseCase = new RefreshTokenUseCase(
            userTokensRepositoryinMemory,
            dateProvider
        );
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryinMemory,
            dateProvider
        );
    });

    it("should be able to create a new refresh token", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            username: "User",
            email: "user@test.com",
            password: "1234",
            documentId: "00000000000",
            status: UserStatusEnum.ACTIVE,
            type: UserTypeEnum.USER,
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        const { email } = await createUserUseCase.execute(user);

        const { refresh_token } = await authenticateUserUseCase.execute({
            email,
            password: "1234",
        });

        const result = await refreshTokenUseCase.execute(refresh_token);

        expect(result).not.toBe(null);
    });

    it("should not be able to create a refresh token with a invalid refresh_token", async () => {
        expect(async () => {
            await refreshTokenUseCase.execute(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQ4OTA4MzcsImV4cCI6MTY1NzQ4MjgzNywic3ViIjoiZGE3MTE4MGYtNzQ3MC00YWFkLWJjYzMtYjZkYzQxZmM4YmIxIn0.xnwuFT8nODs-IkodrCuvFw3yC6FQagmG9pygGYQNarE"
            );
        }).rejects.toBeInstanceOf(TokenExpiredError);
    });
});
