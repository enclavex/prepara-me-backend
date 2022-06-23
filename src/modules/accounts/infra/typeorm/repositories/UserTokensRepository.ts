import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { getRepository, Repository } from "typeorm";

import { UserTokens } from "../entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userTokens = await this.repository.findOne({ refresh_token });

        return userTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = await this.repository.findOne({
            user_id,
            refresh_token,
        });

        return userToken;
    }

    async findByUserId(user_id: string): Promise<UserTokens[]> {
        const userTokens = await this.repository.find({ user_id });

        return userTokens;
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}

export { UserTokensRepository };
