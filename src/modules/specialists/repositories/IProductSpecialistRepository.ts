import { ICreateProductSpecialistDTO } from "../dtos/ICreateProductSpecialistDTO"
import { ProductSpecialist } from "../infra/typeorm/entities/ProductSpecialist"
import { Specialist } from "../infra/typeorm/entities/Specialist"

interface IProductSpecialistRepository {
    create(data: ICreateProductSpecialistDTO): Promise<ProductSpecialist>
    listSpecialistsByProduct(productId: string): Promise<string[]>
}

export { IProductSpecialistRepository }