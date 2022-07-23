import { ICreateProductSpecialistDTO } from "@modules/specialists/dtos/ICreateProductSpecialistDTO";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { ProductSpecialist } from "../../entities/ProductSpecialist";

class ProductSpecialistRepositoryInMemory implements IProductsSpecialistsRepository {
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

    async listSpecialistsByProduct(productId: string): Promise<string[]> {
        return this.productsSpecialist.filter((productsSpecialist) => {
            return productsSpecialist.productId === productId
        }).map((productsSpecialist) => {
            return productsSpecialist.specialistId
        })
    }
}

export { ProductSpecialistRepositoryInMemory }