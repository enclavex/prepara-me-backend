import { ICreateUserProductAvailableDTO } from "@modules/accounts/dtos/ICreateUserProductAvailableDTO";
import { IUserProductAvailableResponseDTO } from "@modules/accounts/dtos/IUserProductAvailableResponseDTO";
import { UserProductsAvailableMap } from "@modules/accounts/mapper/UserProductsAvailable";
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
        id,
    }: ICreateUserProductAvailableDTO): Promise<UserProductAvailable> {
        const userProductAvailable = this.repository.create({
            userId,
            productId,
            availableQuantity,
            id,
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

    async find({ id, userId, productId }): Promise<IUserProductAvailableResponseDTO[]> {
        const userProductAvailableQuery = this.repository
            .createQueryBuilder("upa")
            .leftJoinAndSelect("upa.product", "product")
            .leftJoinAndSelect("upa.user", "user");

        if (id) {
            userProductAvailableQuery.andWhere("upa.id = :id", {
                id: id,
            });
        } else {
            if (userId) {
                userProductAvailableQuery.andWhere("upa.userId = :userId", {
                    userId: userId,
                });
            }

            if (productId) {
                userProductAvailableQuery.andWhere(
                    "upa.productId = :productId",
                    {
                        productId: productId,
                    }
                );
            }
        }

        const userProductsAvailables =
            await userProductAvailableQuery.getMany();

        const userProductsAvailablesMapped = userProductsAvailables.map(
            (userProductAvailables) => {
                return UserProductsAvailableMap.toDTO(userProductAvailables);
            }
        );

        return userProductsAvailablesMapped;
    }
}

export { UserProductsAvailableRepository };

