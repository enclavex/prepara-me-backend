import { ICreateProductContentDTO } from "@modules/products/dtos/ICreateProductContentDTO";
import { ProductContent } from "@modules/products/infra/typeorm/entities/ProductContent";

import { IProductContentsRepository } from "../IProductContentsRepository";

class ProductContentsRepositoryInMemory implements IProductContentsRepository {
    productContents: ProductContent[] = [];

    async create({
        content,
        productId,
        id,
    }: ICreateProductContentDTO): Promise<ProductContent> {
        const productContent = new ProductContent(content, productId, id);

        this.productContents.push(productContent);

        return productContent;
    }

    async remove(id: string): Promise<string> {
        this.productContents = this.productContents.filter((productContent) => {
            return id !== productContent.id;
        });

        return id
    }
}

export { ProductContentsRepositoryInMemory };

