import { ICreateProductSpecialistDTO } from "../dtos/ICreateProductSpecialistDTO"
import { ProductSpecialist } from "../infra/typeorm/entities/ProductSpecialist"

interface IRequestFind {
    productId: string;
    specialistId: string;
    id?: string;
}

interface IProductsSpecialistsRepository {
    create(data: ICreateProductSpecialistDTO): Promise<ProductSpecialist>
    listSpecialistsByProduct(productId: string): Promise<string[]>
    remove(id: string): Promise<string>;
    find(data: IRequestFind): Promise<ProductSpecialist[]>
}

export { IProductsSpecialistsRepository }