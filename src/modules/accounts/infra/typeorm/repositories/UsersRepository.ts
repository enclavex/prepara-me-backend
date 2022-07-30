import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserStatusEnum } from "@modules/accounts/enums/UserStatusEnum";
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
        status,
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            id,
            name,
            username,
            email,
            password,
            documentId,
            type,
            status,
            avatar,
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

    async find({
        name,
        status,
        type,
        email,
        documentId,
        id,
    }): Promise<IUserResponseDTO[]> {
        const usersQuery = this.repository.createQueryBuilder("u");

        if (id) {
            usersQuery.andWhere("u.id = :id", {
                id: id,
            });
        } else {
            if (name) {
                name = `%${name}%`;

                usersQuery.andWhere("u.name like :name", {
                    name: name,
                });
            }

            if (status) {
                usersQuery.andWhere("u.status = :status", {
                    status: status,
                });
            }

            if (documentId) {
                usersQuery.andWhere("u.documentId = :documentId", {
                    documentId: documentId,
                });
            }

            if (type) {
                usersQuery.andWhere("u.type = :type", {
                    type: type,
                });
            }

            if (email) {
                usersQuery.andWhere("u.email = :email", {
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

    async remove(id: string): Promise<string> {
        this.repository.delete(id);

        return id;
    }
}

export { UsersRepository };

