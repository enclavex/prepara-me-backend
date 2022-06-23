import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductAvailableUseCase } from "./ListProductAvailableUseCase";

class ListProductAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listProductAvailableUseCase = container.resolve(
            ListProductAvailableUseCase
        );

        const listProductAvailable =
            await listProductAvailableUseCase.execute();

        return response.status(200).json(listProductAvailable);
    }
}

export { ListProductAvailableController };
