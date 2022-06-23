import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            username: "User",
            email: "user@test.com",
            password: "1234",
            documentId: "00000000000",
            type: "C",
        };

        const result = await createUserUseCase.execute(user);

        expect(result).toHaveProperty("id");
        expect(result.password).not.toBe("1234");
    });

    it("should not be able to create a user with wrong type", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                username: "User",
                email: "user@test.com",
                password: "1234",
                documentId: "00000000000",
                type: "X",
            };

            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a user with no documentId", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test",
                username: "User",
                email: "user@test.com",
                password: "1234",
                documentId: "",
                type: "C",
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
                type: "C",
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
                type: "C",
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
                type: "C",
            };

            await createUserUseCase.execute(user);
        }).rejects.toBeInstanceOf(AppError);
    });
});
