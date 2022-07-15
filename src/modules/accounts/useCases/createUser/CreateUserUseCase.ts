import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { UserTypeEnum } from "@modules/accounts/enums/UserTypeEnum";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        username,
        email,
        password,
        documentId,
        type,
    }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("E-mail used by another user!");
        }

        const passwordHash = await hash(password, 8);

        if (!Object.values(UserTypeEnum).includes(type)) {
            throw new AppError("Type entered wrong");
        }

        if (!documentId) {
            throw new AppError("DocumentId can't be null!");
        }

        if (!name) {
            throw new AppError("Name can't be null!");
        }

        if (!password) {
            throw new AppError("Password can't be null!");
        }

        if (!email) {
            throw new AppError("E-mail can't be null!");
        }

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            password: passwordHash,
            documentId,
            type,
        });

        return user;
    }
}

export { CreateUserUseCase };
