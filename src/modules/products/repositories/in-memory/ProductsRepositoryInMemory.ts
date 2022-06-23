import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { IProductsRepository } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {
    products: Product[] = [];

    async create({
        name,
        shortName,
        price,
        status,
        type,
        bestSeller,
    }: ICreateProductDTO): Promise<Product> {
        const product = new Product(
            name,
            shortName,
            price,
            status,
            type,
            bestSeller
        );

        this.products.push(product);

        return product;
    }

    async findById(id: string): Promise<Product> {
        return this.products.find((product) => product.id === id);
    }

    async findAvailable(): Promise<Product[]> {
        return this.products.filter((product) => {
            return product.status === ProductStatusEnum.ACTIVE;
        });
    }

    async findAvailableBestSellers(): Promise<Product[]> {
        return this.products.filter((product) => {
            return (
                product.status === ProductStatusEnum.ACTIVE &&
                product.bestSeller === ProductBestSellerEnum.BEST_SELLER
            );
        });
    }
}

export { ProductsRepositoryInMemory };
