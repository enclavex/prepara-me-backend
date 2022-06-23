import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { getRepository, Repository } from "typeorm";

import { Product } from "../entities/Product";

class ProductsRepository implements IProductsRepository {
    private repository: Repository<Product>;

    constructor() {
        this.repository = getRepository(Product);
    }

    async create({
        name,
        shortName,
        price,
        status,
        type,
        bestSeller,
        id,
    }: ICreateProductDTO): Promise<Product> {
        const product = this.repository.create({
            name,
            shortName,
            price,
            status,
            type,
            bestSeller,
            id,
        });

        await this.repository.save(product);

        return product;
    }

    async findById(id: string): Promise<Product> {
        const product = await this.repository.findOne(id);
        return product;
    }

    async findAvailable(): Promise<Product[]> {
        const productsQuery = this.repository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.productContent", "productContent")
            .where("p.status = :status", { status: ProductStatusEnum.ACTIVE });

        const products = await productsQuery.getMany();

        return products;
    }

    async findAvailableBestSellers(): Promise<Product[]> {
        const productsQuery = this.repository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.productContent", "productContent")
            .where("p.status = :status", { status: ProductStatusEnum.ACTIVE })
            .andWhere("p.bestSeller = :bestSeller", {
                bestSeller: ProductBestSellerEnum.BEST_SELLER,
            });

        const products = await productsQuery.getMany();

        return products;
    }
}

export { ProductsRepository };
