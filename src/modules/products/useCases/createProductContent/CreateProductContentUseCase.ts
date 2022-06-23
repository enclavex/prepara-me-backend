import { ICreateProductContentDTO } from "@modules/products/dtos/ICreateProductContentDTO";
import { ProductContent } from "@modules/products/infra/typeorm/entities/ProductContent";
import { IProductContentsRepository } from "@modules/products/repositories/IProductContentsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateProductContentUseCase {
    constructor(
        @inject("ProductContentsRepository")
        private productContentsRepository: IProductContentsRepository
    ) {}

    async execute({
        content,
        productId,
    }: ICreateProductContentDTO): Promise<ProductContent> {
        if (!productId) {
            throw new AppError("Product ID Can't be null");
        }

        const productContent = this.productContentsRepository.create({
            content,
            productId,
        });

        return productContent;
    }
}

export { CreateProductContentUseCase };
