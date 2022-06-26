import { ICreateProductSpecialistDTO } from "@modules/specialists/dtos/ICreateProductSpecialistDTO";
import { IProductSpecialistRepository } from "@modules/specialists/repositories/IProductSpecialistRepository";
import { ProductSpecialist } from "../../entities/ProductSpecialist";

class ProductSpecialistRepositoryInMemory implements IProductSpecialistRepository {
    productsSpecialist: ProductSpecialist[] = []

    async create({
        product,
        specialist
    }: ICreateProductSpecialistDTO): Promise<ProductSpecialist> {
        const productSpecialist = new ProductSpecialist(
            product.id,
            specialist.id
        )

        this.productsSpecialist.push(productSpecialist)

        return productSpecialist
    }

}

export { ProductSpecialistRepositoryInMemory }