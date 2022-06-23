import { ICreateProductContentDTO } from "../dtos/ICreateProductContentDTO";
import { ProductContent } from "../infra/typeorm/entities/ProductContent";

interface IProductContentsRepository {
    create(data: ICreateProductContentDTO): Promise<ProductContent>;
}

export { IProductContentsRepository };
