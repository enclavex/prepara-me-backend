import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveProductUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) {}

    async execute(id) {
        await this.productsRepository.remove(id);
    }
}

export { RemoveProductUseCase };

