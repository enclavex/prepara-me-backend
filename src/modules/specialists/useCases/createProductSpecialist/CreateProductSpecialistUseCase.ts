import { IProductsRepository } from "@modules/products/repositories/IProductsRepository"
import { ProductSpecialist } from "@modules/specialists/infra/typeorm/entities/ProductSpecialist"
import { IProductSpecialistRepository } from "@modules/specialists/repositories/IProductSpecialistRepository"
import { ISpecialistsRepository } from "@modules/specialists/repositories/ISpecialistsRepository"
import { inject, injectable } from "tsyringe"

interface IRequest {
    products: string[],
    specialistId: string
}

@injectable()
class CreateProductSpecialistUseCase {
    constructor(
        @inject("ProductSpecialistRepository")
        private productSpecialistRepository: IProductSpecialistRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("SpecialistRepository")
        private specialistRepository: ISpecialistsRepository
    ) { }

    async execute({
        products,
        specialistId
    }: IRequest): Promise<ProductSpecialist[]> {
        const specialist = await this.specialistRepository.findById(specialistId);
        
        const productsSpecialist = products.map(async (productId) => {
            const product = await this.productsRepository.findById(productId);

            const productSpecialist = await this.productSpecialistRepository.create({
                product,
                specialist
            })

            return productSpecialist
        })

        const productsSpecialistResolved = Promise.all(productsSpecialist).then((productsSpecialist) => {
            return productsSpecialist
        })

        return productsSpecialistResolved
    }
}

export { CreateProductSpecialistUseCase }