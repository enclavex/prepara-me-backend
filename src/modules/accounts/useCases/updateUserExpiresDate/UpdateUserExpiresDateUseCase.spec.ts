import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRealocatedEnum } from "@modules/accounts/enums/UserRealocatedEnum";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UserProductsAvailableRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserProductsAvailableRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CompanyEmployeesRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanyEmployeesRepositoryInMemory";
import { CompanySubscriptionPlansRepositoryInMemory } from "@modules/company/repositories/in-memory/CompanySubscriptionPlansRepositoryInMemory";
import { SubscriptionPlansRepositoryInMemory } from "@modules/products/repositories/in-memory/SubscriptionPlansRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserExpiresDateUseCase } from "./UpdateUserExpiresDateUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let companySubscriptionPlansRepository: CompanySubscriptionPlansRepositoryInMemory;
let companyEmployeesRepository: CompanyEmployeesRepositoryInMemory;
let subscriptionPlansRepository: SubscriptionPlansRepositoryInMemory;
let userProductsAvailableRepository: UserProductsAvailableRepositoryInMemory;
let updateUserExpiresDateUseCase: UpdateUserExpiresDateUseCase;
let dayjsDateProvider: IDateProvider;

describe("update user expiresDate", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            companySubscriptionPlansRepository,
            companyEmployeesRepository,
            subscriptionPlansRepository,
            userProductsAvailableRepository
        );
        updateUserExpiresDateUseCase = new UpdateUserExpiresDateUseCase(
            usersRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("should be able to update a user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            username: "User",
            email: "user@test.com",
            password: "1234",
            documentId: "00000000000",
            status: UserStatusEnum.ACTIVE,
            type: UserTypeEnum.USER,
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: null,
            periodTest: null,
        };

        const userCreated = await createUserUseCase.execute(user);

        await updateUserExpiresDateUseCase.execute({
            user_id: userCreated.id,
        });
    });
});

