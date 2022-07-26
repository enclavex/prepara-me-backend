import { ICreateProductSpecialistDTO } from "@modules/specialists/dtos/ICreateProductSpecialistDTO";
import { IProductsSpecialistsRepository } from "@modules/specialists/repositories/IProductsSpecialistsRepository";
import { ProductSpecialist } from "../../infra/typeorm/entities/ProductSpecialist";

class ProductsSpecialistsRepositoryInMemory
    implements IProductsSpecialistsRepository
{
    productsSpecialist: ProductSpecialist[] = [];

    async create({
        productId,
        specialistId,
        id,
    }: ICreateProductSpecialistDTO): Promise<ProductSpecialist> {
        const productSpecialist = new ProductSpecialist(
            productId,
            specialistId,
            id
        );

        this.productsSpecialist.push(productSpecialist);

        return productSpecialist;
    }

    async listSpecialistsByProduct(productId: string): Promise<string[]> {
        return this.productsSpecialist
            .filter((productsSpecialist) => {
                return productsSpecialist.productId === productId;
            })
            .map((productsSpecialist) => {
                return productsSpecialist.specialistId;
            });
    }

    async remove(id: string): Promise<string> {
        this.productsSpecialist = this.productsSpecialist.filter((productsSpecialist) => {
            return id !== productsSpecialist.id;
        });

        return id
    }
}

export { ProductsSpecialistsRepositoryInMemory };
