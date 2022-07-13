import { ICreateUserProductAvailableDTO } from "../dtos/ICreateUserProductAvailableDTO";
import { UserProductAvailable } from "../infra/typeorm/entities/UserProductAvailable";

interface IUserProductsAvailableRepository {
    create(
        data: ICreateUserProductAvailableDTO
    ): Promise<UserProductAvailable>;
    findById(id: string): Promise<UserProductAvailable>;
    findByUser(userId: string): Promise<UserProductAvailable[]>;
}

export { IUserProductsAvailableRepository };
