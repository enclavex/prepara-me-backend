import { ICreateUserProductAvailableDTO } from "@modules/accounts/dtos/ICreateUserProductAvailableDTO";
import { IUserProductsAvailableRepository } from "@modules/accounts/repositories/IUserProductsAvailableRepository";
import { getRepository, Repository } from "typeorm";
import { UserProductAvailable } from "../entities/UserProductAvailable";

class UserProductsAvailableRepository
    implements IUserProductsAvailableRepository
{
    private repository: Repository<UserProductAvailable>;

    constructor() {
        this.repository = getRepository(UserProductAvailable);
    }

    async create({
        userId,
        productId,
        availableQuantity,
    }: ICreateUserProductAvailableDTO): Promise<UserProductAvailable> {
        const userProductAvailable = this.repository.create({
            userId,
            productId,
            availableQuantity,
        });

        await this.repository.save(userProductAvailable);

        return userProductAvailable;
    }

    async findById(id: string): Promise<UserProductAvailable> {
        const userProductAvailable = await this.repository.findOne(id);
        return userProductAvailable;
    }

    async findByUser(userId: string): Promise<UserProductAvailable[]> {
        const userProductAvailableQuery = this.repository
            .createQueryBuilder("u")
            .leftJoinAndSelect("u.product", "product")
            .where("u.userId = :userId", {
                userId: userId,
            })
            .andWhere("u.availableQuantity > 0");

        const userProductAvailable = await userProductAvailableQuery.getMany();

        return userProductAvailable;
    }
}

export { UserProductsAvailableRepository };

