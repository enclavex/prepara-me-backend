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
import { ListUserUseCase } from "../listUser/ListUserUseCase";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let companySubscriptionPlansRepository: CompanySubscriptionPlansRepositoryInMemory;
let companyEmployeesRepository: CompanyEmployeesRepositoryInMemory;
let subscriptionPlansRepository: SubscriptionPlansRepositoryInMemory;
let userProductsAvailableRepository: UserProductsAvailableRepositoryInMemory;
let removeUserUseCase: RemoveUserUseCase;
let listUserUseCase: ListUserUseCase;

describe("Remove User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        listUserUseCase = new ListUserUseCase(usersRepositoryInMemory);
        removeUserUseCase = new RemoveUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory,
            companySubscriptionPlansRepository,
            companyEmployeesRepository,
            subscriptionPlansRepository,
            userProductsAvailableRepository
        );
    });

    it("should be able to delete a user", async () => {
        const user1: ICreateUserDTO = {
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

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Test",
            username: "User",
            email: "user2@test.com",
            password: "1234",
            documentId: "00000000001",
            status: UserStatusEnum.ACTIVE,
            type: UserTypeEnum.USER,
            realocated: UserRealocatedEnum.NOT_REALOCATED,
            expiresDate: new Date(),
            periodTest: new Date(),
        };

        const userCreated = await createUserUseCase.execute(user2);

        await removeUserUseCase.execute(userCreated.id);

        const result = await listUserUseCase.execute({
            id: "",
            name: "",
            status: "",
            email: "",
            type: "",
            documentId: "",
            realocated: "",
            laborRiskAlert: ""
        });

        expect(result).toHaveLength(1);
    });
});

