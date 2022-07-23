import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ListUserUseCase } from "./ListUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let listUserUseCase: ListUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("List User", () => {
    beforeEach(() => {
        usersRepositoryInMemory =
            new UsersRepositoryInMemory();
        listUserUseCase = new ListUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory
        );
    });

    it("should be able to list users", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "",
            status: "",
            type: ""
        });

        expect(result).toHaveLength(2);
    });

    it("should be able to list users filtered by name", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "One",
            status: "",
            type: ""
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by email", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "user2@user.com",
            id: "",
            name: "",
            status: "",
            type: ""
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by status", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            active: UserStatusEnum.INACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "",
            status: UserStatusEnum.INACTIVE,
            type: ""
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by type", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.ADMIN,
            username: "User One"
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            active: UserStatusEnum.INACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: "",
            name: "",
            status: "",
            type: UserTypeEnum.USER
        });

        expect(result).toHaveLength(1);
    });

    it("should be able to list users filtered by id", async () => {
        const user1: ICreateUserDTO = {
            name: "User One",
            active: UserStatusEnum.ACTIVE,
            documentId: "08113754989",
            email: "user@user.com",
            password: "123",
            type: UserTypeEnum.ADMIN,
            username: "User One"
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUserDTO = {
            name: "User Two",
            active: UserStatusEnum.INACTIVE,
            documentId: "08113754989",
            email: "user2@user.com",
            password: "123",
            type: UserTypeEnum.USER,
            username: "User One"
        };

        const userCreated = await createUserUseCase.execute(user2);

        const result = await listUserUseCase.execute({
            email: "",
            id: userCreated.id,
            name: "",
            status: "",
            type: ""
        });

        expect(result).toHaveLength(1);
    });
});