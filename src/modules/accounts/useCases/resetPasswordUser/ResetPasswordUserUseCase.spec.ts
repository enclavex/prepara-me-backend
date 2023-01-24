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
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let resetPasswordUserUseCase: ResetPasswordUserUseCase;
let dateProvider: DayjsDateProvider;
let userTokensRepositoryinMemory: UserTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let companySubscriptionPlansRepository: CompanySubscriptionPlansRepositoryInMemory;
let companyEmployeesRepository: CompanyEmployeesRepositoryInMemory;
let subscriptionPlansRepository: SubscriptionPlansRepositoryInMemory;
let userProductsAvailableRepository: UserProductsAvailableRepositoryInMemory;

describe("Reset Password", () => {
    beforeEach(() => {
        dateProvider = new DayjsDateProvider();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            companySubscriptionPlansRepository,
            companyEmployeesRepository,
            subscriptionPlansRepository,
            userProductsAvailableRepository)
        userTokensRepositoryinMemory = new UserTokensRepositoryInMemory();
        resetPasswordUserUseCase = new ResetPasswordUserUseCase(
            userTokensRepositoryinMemory,
            dateProvider,
            usersRepositoryInMemory
        );
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryinMemory,
            dateProvider
        );
    });

    it("should be able to reset a password", async () => {
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

        const tokensAnt = await authenticateUserUseCase.execute({
            email,
            password: "1234",
        });

        await resetPasswordUserUseCase.execute({
            refresh_token: tokensAnt.refresh_token,
            password: "123",
        });

        const tokensNew = await authenticateUserUseCase.execute({
            email,
            password: "123",
        });

        expect(tokensNew.refresh_token).not.toBe(null);
    });

    it("should not be able to reset a password with invalid token", async () => {
        expect(async () => {
            await resetPasswordUserUseCase.execute({
                refresh_token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQ4OTA4MzcsImV4cCI6MTY1NzQ4MjgzNywic3ViIjoiZGE3MTE4MGYtNzQ3MC00YWFkLWJjYzMtYjZkYzQxZmM4YmIxIn0.xnwuFT8nODs-IkodrCuvFw3yC6FQagmG9pygGYQNarE",
                password: "123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
