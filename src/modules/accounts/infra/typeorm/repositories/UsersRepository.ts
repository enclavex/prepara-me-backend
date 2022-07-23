import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        username,
        email,
        password,
        documentId,
        type,
        avatar,
        id,
        active
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            name,
            username,
            email,
            password,
            documentId,
            type,
            avatar,
            id,
            active
        });

        await this.repository.save(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async find({ name, status, type, email, id }): Promise<IUserResponseDTO[]> {
        const usersQuery = this.repository.createQueryBuilder("u");

        if (id) {
            usersQuery.andWhere("e.id = :id", {
                id: id,
            });
        } else {
            if (name) {
                name = `%${name}%`;

                usersQuery.andWhere("e.name like :name", {
                    name: name,
                });
            }

            if (status) {
                usersQuery.andWhere("e.status = :status", {
                    status: status,
                });
            }

            if (type) {
                usersQuery.andWhere("e.type = :type", {
                    type: type,
                });
            }

            if (email) {
                usersQuery.andWhere("e.email = :email", {
                    email: email,
                });
            }
        }

        const users = await usersQuery.getMany();

        const usersMapped = users.map((user) => {
            return UserMap.toDTO(user);
        });

        return usersMapped;
    }
}

export { UsersRepository };

