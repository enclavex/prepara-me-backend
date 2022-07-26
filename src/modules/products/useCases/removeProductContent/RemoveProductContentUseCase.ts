import { IProductContentsRepository } from "@modules/products/repositories/IProductContentsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveProductContentUseCase {
    constructor(
        @inject("ProductContentsRepository")
        private productContentsRepository: IProductContentsRepository
    ) {}

    async execute(id) {
        await this.productContentsRepository.remove(id);
    }
}

export { RemoveProductContentUseCase };

 