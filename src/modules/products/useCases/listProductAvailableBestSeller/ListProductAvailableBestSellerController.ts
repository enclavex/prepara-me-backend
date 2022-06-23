import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductAvailableBestSellerUseCase } from "./ListProductAvailableBestSellerUseCase";

class ListProductAvailableBestSellerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listProductAvailableBestSellerUseCase = container.resolve(
            ListProductAvailableBestSellerUseCase
        );

        const listProductsAvailableBestSeller =
            await listProductAvailableBestSellerUseCase.execute();

        return response.status(200).json(listProductsAvailableBestSeller);
    }
}

export { ListProductAvailableBestSellerController };
