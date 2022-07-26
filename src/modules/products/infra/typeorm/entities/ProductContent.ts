import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Product } from "./Product";

@Entity("productContents")
class ProductContent {
    @PrimaryColumn()
    id: string;

    @Column()
    content: string;

    @Column()
    productId: string;

    @ManyToOne(() => Product, (product) => product.productContent)
    product: Product;

    constructor(content: string, productId: string, id: string) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.content = content;
        this.productId = productId;
    }
}

export { ProductContent };

