import { ProductBestSellerEnum } from "@modules/products/enums/ProductBestSellerEnum";
import { ProductStatusEnum } from "@modules/products/enums/ProductStatusEnum";
import { ProductTypeEnum } from "@modules/products/enums/ProductTypesEnum";
import { ProductSpecialist } from "@modules/specialists/infra/typeorm/entities/ProductSpecialist";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ProductContent } from "./ProductContent";

@Entity("products")
class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    shortName: string;

    @Column()
    price: number;

    @Column({
        type: "enum",
        enum: ProductStatusEnum,
        default: ProductStatusEnum.ACTIVE,
    })
    status: ProductStatusEnum;

    @Column({
        type: "enum",
        enum: ProductTypeEnum,
    })
    type: ProductTypeEnum;

    @Column({
        type: "enum",
        enum: ProductBestSellerEnum,
        default: ProductBestSellerEnum.BEST_SELLER,
    })
    bestSeller: ProductBestSellerEnum;

    @OneToMany(() => ProductContent, (productContent) => productContent.product)
    productContent: ProductContent[];

    @OneToMany(() => ProductSpecialist, productSpecialist => productSpecialist.product)
    productSpecialist: ProductSpecialist[]

    constructor(
        name: string,
        shortName: string,
        price: number,
        status: ProductStatusEnum,
        type: ProductTypeEnum,
        bestSeller: ProductBestSellerEnum
    ) {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name;
        this.shortName = shortName;
        this.price = price;
        this.status = status;
        this.type = type;
        this.bestSeller = bestSeller;
    }
}

export { Product };
