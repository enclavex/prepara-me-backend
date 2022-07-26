import { ProductSpecialist } from "@modules/specialists/infra/typeorm/entities/ProductSpecialist";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    productId: string;
    specialistId: string;
    id?: string;
}

@injectable()
class CreateProductSpecialistUseCase {
    constructor(
        @inject("ProductsSpecialistsRepository")
        private productsSpecialistsRepository: IProductsSpecialistsRepository,
    ) {}

    async execute({
        productId,
        specialistId,
        id,
    }: IRequest): Promise<ProductSpecialist> {
        const productSpecialist =
            await this.productsSpecialistsRepository.create({
                productId,
                specialistId,
                id,
            });

        return productSpecialist;
    }
}

export { CreateProductSpecialistUseCase };

