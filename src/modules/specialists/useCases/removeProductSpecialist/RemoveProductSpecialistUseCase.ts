import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveProductSpecialistUseCase {
    constructor(
        @inject("ProductsSpecialistsRepository")
        private productsSpecialistsRepository: IProductsSpecialistsRepository
    ) {}

    async execute(id) {
        return await this.productsSpecialistsRepository.remove(id);
    }
}

export { RemoveProductSpecialistUseCase };

 