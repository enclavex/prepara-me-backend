import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserMap } from "@modules/accounts/mapper/UserMap";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        username,
        email,
        password,
        documentId,
        type,
        id,
        active
    }: ICreateUserDTO): Promise<User> {
        const user = new User(
            name,
            username,
            email,
            password,
            documentId,
            type,
            active,
            id,
        );

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }

    async find({ name, status, type, email, id }): Promise<IUserResponseDTO[]> {
        let users = this.users;

        if (id) {
            users = users.filter((user) => {
                return user.id === id;
            });
        } else {
            if (status) {
                users = users.filter((user) => {
                    return user.active === status;
                });
            }

            if (email) {
                users = users.filter((user) => {
                    return user.email === email;
                });
            }

            if (type) {
                users = users.filter((user) => {
                    return user.type === type;
                });
            }

            if (name) {
                users = users.filter((user) => {
                    return user.name.includes(name);
                });
            }
        }

        return users.map((user) => {
            return UserMap.toDTO(user);
        });
    }
}

export { UsersRepositoryInMemory };

