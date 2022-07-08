import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IRequest;

        const user_id = sub;

        const userToken =
            await this.userTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token doesn't exists!");
        }

        await this.userTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({}, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dayjsDateProvider.addDays(
            auth.expires_refresh_token_days
        );

        await this.userTokensRepository.create({
            expires_date,
            refresh_token,
            user_id: sub,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: sub,
            expiresIn: auth.expires_in_token,
        });

        return {
            refresh_token,
            token: newToken,
        };
    }
}

export { RefreshTokenUseCase };

