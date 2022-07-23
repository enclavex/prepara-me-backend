import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IResponseProductDTO } from "@modules/products/dtos/IResponseProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductMap } from "@modules/products/mapper/ProductMap";
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

    async find({
        name,
        status,
        type,
        shortName,
        bestSeller,
        id,
    }): Promise<IResponseProductDTO[]> {
        const productsQuery = this.repository.createQueryBuilder("p");

        if (id) {
            productsQuery.andWhere("p.id = :id", {
                id: id,
            });
        } else {
            if (status) {
                productsQuery.andWhere("p.status = :status", {
                    status: status,
                });
            }

            if (type) {
                productsQuery.andWhere("p.type = :type", {
                    type: type,
                });
            }

            if (bestSeller) {
                productsQuery.andWhere("p.bestSeller = :bestSeller", {
                    bestSeller: bestSeller,
                });
            }

            if (name) {
                name = `%${name}%`;

                productsQuery.andWhere("p.name like :name", {
                    name: name,
                });
            }

            if (shortName) {
                shortName = `%${shortName}%`;

                productsQuery.andWhere("p.shortName like :shortName", {
                    shortName: shortName,
                });
            }
        }

        const products = await productsQuery.getMany();

        const productsMaped = products.map((product) => {
            return ProductMap.toDTO(product);
        });

        return productsMaped;
    }

    async remove(id: string): Promise<void> {
        this.repository.delete(id);
    }
}

export { ProductsRepository };

