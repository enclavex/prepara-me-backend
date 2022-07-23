import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IResponseProductDTO } from "@modules/products/dtos/IResponseProductDTO";
import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { ProductMap } from "@modules/products/mapper/ProductMap";

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
        id,
    }: ICreateProductDTO): Promise<Product> {
        const product = new Product(
            name,
            shortName,
            price,
            status,
            type,
            bestSeller,
            id
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

    async find({
        name,
        status,
        type,
        shortName,
        bestSeller,
        id,
    }): Promise<IResponseProductDTO[]> {
        let products = this.products;

        if (id) {
            products = products.filter((product) => {
                return product.id === id;
            });
        } else {
            if (status) {
                products = products.filter((product) => {
                    return product.status === status;
                });
            }

            if (type) {
                products = products.filter((product) => {
                    return product.type === type;
                });
            }

            if (bestSeller) {
                products = products.filter((product) => {
                    return product.bestSeller === bestSeller;
                });
            }

            if (name) {
                products = products.filter((product) => {
                    return product.name.includes(name);
                });
            }

            if (shortName) {
                products = products.filter((product) => {
                    return product.shortName.includes(shortName);
                });
            }
        }

        const productsMaped = products.map((product) => {
            return ProductMap.toDTO(product);
        });

        return productsMaped;
    }

    async remove(id): Promise<void> {
        this.products = this.products.filter((product) => {
            return id !== product.id;
        });
    }
}

export { ProductsRepositoryInMemory };

