import { ICreateProductSpecialistDTO } from "@modules/specialists/dtos/ICreateProductSpecialistDTO"
import { getRepository, Repository } from "typeorm"
import { IProductSpecialistRepository } from "../../../repositories/IProductSpecialistRepository"
import { ProductSpecialist } from "../entities/ProductSpecialist"

class ProductSpecialistRepository implements IProductSpecialistRepository {
    private repository: Repository<ProductSpecialist>

    constructor() {
        this.repository = getRepository(ProductSpecialist)
    }

    async create({
        product,
        specialist
    }: ICreateProductSpecialistDTO): Promise<ProductSpecialist> {
        const productSpecialist = this.repository.create({
            product,
            specialist,
            productId: product.id,
            specialistId: specialist.id
        })

        await this.repository.save(productSpecialist)

        return productSpecialist
    }

}

export { ProductSpecialistRepository }