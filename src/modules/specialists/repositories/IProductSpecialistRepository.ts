import { ICreateProductSpecialistDTO } from "../dtos/ICreateProductSpecialistDTO"
import { ProductSpecialist } from "../infra/typeorm/entities/ProductSpecialist"

interface IProductSpecialistRepository {
    create(data: ICreateProductSpecialistDTO): Promise<ProductSpecialist>
}

export { IProductSpecialistRepository }