import { ProductSpecialist } from "@modules/specialists/infra/typeorm/entities/ProductSpecialist";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListProductSpecialistUseCase {
    constructor(
        @inject("ProductsSpecialistsRepository")
        private productsSpecialistsRepository: IProductsSpecialistsRepository
    ) {}

    async execute({
        productId,
        specialistId,
        id,
    }): Promise<ProductSpecialist[]> {
        const productsSpecialists = await this.productsSpecialistsRepository.find({
            productId,
            specialistId,
            id,
        });

        return productsSpecialists;
    }
}

export { ListProductSpecialistUseCase };
