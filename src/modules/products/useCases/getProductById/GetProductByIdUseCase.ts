import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetProductByIdUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(productId: string): Promise<Product> {
        const product = await this.productsRepository.findById(productId)

        return product
    }
}

export { GetProductByIdUseCase };