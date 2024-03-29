import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductContentUseCase } from "./CreateProductContentUseCase";

class CreateProductContentController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { content, id } = request.body;
        const { productId } = request.params;

        const createProductContentUseCase = container.resolve(
            CreateProductContentUseCase
        );

        const productContent = createProductContentUseCase.execute({
            content,
            productId,
            id
        });

        return response.status(201).json(productContent);
    }
}

export { CreateProductContentController };
