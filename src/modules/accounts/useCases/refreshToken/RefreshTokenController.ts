import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const oldToken =
            request.body.token ||
            request.headers["x-access-token"] ||
            request.query.token;

        if (!oldToken) {
            return response.status(400).send()
        }

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const { refresh_token, token } = await refreshTokenUseCase.execute(
            oldToken
        );

        return response.json({ refresh_token, token });
    }
}

export { RefreshTokenController };

