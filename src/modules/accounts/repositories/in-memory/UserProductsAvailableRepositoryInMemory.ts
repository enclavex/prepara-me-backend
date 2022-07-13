import { ICreateUserProductAvailableDTO } from "@modules/accounts/dtos/ICreateUserProductAvailableDTO";
import { UserProductAvailable } from "@modules/accounts/infra/typeorm/entities/UserProductAvailable";
import { IUserProductsAvailableRepository } from "../IUserProductsAvailableRepository";

class UserProductsAvailableRepositoryInMemory
    implements IUserProductsAvailableRepository
{
    userProductsAvailable: UserProductAvailable[] = [];

    async create({
        userId,
        productId,
        availableQuantity,
    }: ICreateUserProductAvailableDTO): Promise<UserProductAvailable> {
        const userProductAvailable = new UserProductAvailable(
            userId,
            productId,
            availableQuantity
        );

        this.userProductsAvailable.push(userProductAvailable);

        return userProductAvailable;
    }

    async findById(id: string): Promise<UserProductAvailable> {
        return this.userProductsAvailable.find(
            (userProductAvailable) => userProductAvailable.id === id
        );
    }

    async findByUser(userId: string): Promise<UserProductAvailable[]> {
        return this.userProductsAvailable.filter((userProductAvailable) => {
            return userProductAvailable.userId === userId;
        });
    }
}

export { UserProductsAvailableRepositoryInMemory };

