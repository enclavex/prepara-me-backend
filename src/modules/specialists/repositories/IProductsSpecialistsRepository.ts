import { ICreateProductSpecialistDTO } from "../dtos/ICreateProductSpecialistDTO"
import { ProductSpecialist } from "../infra/typeorm/entities/ProductSpecialist"

interface IProductsSpecialistsRepository {
    create(data: ICreateProductSpecialistDTO): Promise<ProductSpecialist>
    listSpecialistsByProduct(productId: string): Promise<string[]>
}

export { IProductsSpecialistsRepository }