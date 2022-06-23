import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    findById(id: string): Promise<Product>;
    findAvailable(): Promise<Product[]>;
    findAvailableBestSellers(): Promise<Product[]>;
}

export { IProductsRepository };
