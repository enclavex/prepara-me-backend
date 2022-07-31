import { ICreateProductSpecialistDTO } from "@modules/specialists/dtos/ICreateProductSpecialistDTO";
import { getRepository, Repository } from "typeorm";
import { IProductsSpecialistsRepository } from "../../../repositories/IProductsSpecialistsRepository";
import { ProductSpecialist } from "../entities/ProductSpecialist";

class ProductsSpecialistsRepository implements IProductsSpecialistsRepository {
    private repository: Repository<ProductSpecialist>;

    constructor() {
        this.repository = getRepository(ProductSpecialist);
    }

    async create({
        productId,
        specialistId,
        id,
    }: ICreateProductSpecialistDTO): Promise<ProductSpecialist> {
        const productSpecialist = this.repository.create({
            productId,
            specialistId,
            id,
        });

        await this.repository.save(productSpecialist);

        return productSpecialist;
    }

    async listSpecialistsByProduct(productId: string): Promise<string[]> {
        const listSpecialistsQuery = this.repository
            .createQueryBuilder("ps")
            .where("ps.productId = :productId", { productId });

        const specialists = await listSpecialistsQuery
            .getMany()
            .then((productSpecialists) => {
                return productSpecialists.map((productSpecialist) => {
                    return productSpecialist.specialistId;
                });
            });

        return specialists;
    }

    async find({
        productId,
        specialistId,
        id,
    }): Promise<ProductSpecialist[]> {
        const productsSpecialistsQuery = this.repository
            .createQueryBuilder("ps")

        if (id) {
            productsSpecialistsQuery.andWhere("ps.id = :id", {
                id: id,
            });
        } else {
            if (productId) {
                productsSpecialistsQuery.andWhere("ps.productId = :productId", {
                    productId: productId,
                });
            }

            if (specialistId) {
                productsSpecialistsQuery.andWhere("ps.specialistId = :specialistId", {
                    specialistId: specialistId,
                });
            }
        }

        const productsSpecialists = await productsSpecialistsQuery.getMany();

        return productsSpecialists;
    }

    async remove(id: string): Promise<string> {
        this.repository.delete(id);

        return id;
    }
}

export { ProductsSpecialistsRepository };

