import { IProductContentsRepository } from "@modules/products/repositories/IProductContentsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveProductUseCase {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("ProductContentsRepository")
        private productContentsRepository: IProductContentsRepository,
        @inject("ProductsSpecialistsRepository")
        private productsSpecialistsRepository: IProductsSpecialistsRepository
    ) {}

    async execute(id) {
        const specialists =
            await this.productsSpecialistsRepository.listSpecialistsByProduct(
                id
            );

        if (specialists.length > 0) {
            throw new AppError(`Can't delete product: ${id}. Delete the specialist relation.`)
        }

        const products = await this.productsRepository.find({
            id: id,
        });

        products.forEach((product) => {
            if (product.productContent) {
                product.productContent.forEach(async (productContent) => {
                    await this.productContentsRepository.remove(productContent.id);
                });
            }
        });

        await this.productsRepository.remove(id);

        return true;
    }
}

export { RemoveProductUseCase };

