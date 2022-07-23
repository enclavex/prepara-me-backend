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
        product,
        specialist,
    }: ICreateProductSpecialistDTO): Promise<ProductSpecialist> {
        const productSpecialist = this.repository.create({
            product,
            specialist,
            productId: product.id,
            specialistId: specialist.id,
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
}

export { ProductsSpecialistsRepository };
