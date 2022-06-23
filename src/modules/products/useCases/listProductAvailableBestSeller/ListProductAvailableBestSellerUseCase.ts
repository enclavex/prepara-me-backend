import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListProductAvailableBestSellerUseCase {
    constructor(
        @inject("ProductsRepository")
        private productRepository: IProductsRepository
    ) {}

    async execute(): Promise<Product[]> {
        const products =
            await this.productRepository.findAvailableBestSellers();

        return products;
    }
}

export { ListProductAvailableBestSellerUseCase };
