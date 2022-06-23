import { ICreateProductContentDTO } from "@modules/products/dtos/ICreateProductContentDTO";
import { ProductContent } from "@modules/products/infra/typeorm/entities/ProductContent";

import { IProductContentsRepository } from "../IProductContentsRepository";

class ProductContentsRepositoryInMemory implements IProductContentsRepository {
    productContents: ProductContent[] = [];

    async create({
        content,
        productId,
    }: ICreateProductContentDTO): Promise<ProductContent> {
        const productContent = new ProductContent(content, productId);

        this.productContents.push(productContent);

        return productContent;
    }
}

export { ProductContentsRepositoryInMemory };
