import { ICreateProductContentDTO } from "@modules/products/dtos/ICreateProductContentDTO";
import { IProductContentsRepository } from "@modules/products/repositories/IProductContentsRepository";
import { getRepository, Repository } from "typeorm";

import { ProductContent } from "../entities/ProductContent";

class ProductContentsRepository implements IProductContentsRepository {
    private repository: Repository<ProductContent>;

    constructor() {
        this.repository = getRepository(ProductContent);
    }

    async create({
        content,
        productId,
        id,
    }: ICreateProductContentDTO): Promise<ProductContent> {
        const productContent = this.repository.create({
            content,
            productId,
            id,
        });

        await this.repository.save(productContent);

        return productContent;
    }

    async remove(id: string): Promise<string> {
        this.repository.delete(id);

        return id
    }
}

export { ProductContentsRepository };

