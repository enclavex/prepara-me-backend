import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { ProductSpecialist } from "@modules/specialists/infra/typeorm/entities/ProductSpecialist";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    products: string[];
    specialistId: string;
}

@injectable()
class CreateProductSpecialistUseCase {
    constructor(
        @inject("ProductsSpecialistsRepository")
        private productsSpecialistsRepository: IProductsSpecialistsRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("SpecialistsRepository")
        private specialistsRepository: ISpecialistsRepository
    ) {}

    async execute({
        products,
        specialistId,
    }: IRequest): Promise<ProductSpecialist[]> {
        const specialist = await this.specialistsRepository.findById(
            specialistId
        );

        const productsSpecialist = products.map(async (productId) => {
            const product = await this.productsRepository.findById(productId);

            const productSpecialist =
                await this.productsSpecialistsRepository.create({
                    product,
                    specialist,
                });

            return productSpecialist;
        });

        const productsSpecialistResolved = Promise.all(productsSpecialist).then(
            (productsSpecialist) => {
                return productsSpecialist;
            }
        );

        return productsSpecialistResolved;
    }
}

export { CreateProductSpecialistUseCase };
