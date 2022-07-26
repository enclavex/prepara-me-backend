import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { injectable } from "tsyringe";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Specialist } from "./Specialist";
import { v4 as uuidV4 } from "uuid"

@Entity("productSpecialist")
class ProductSpecialist {
    @PrimaryColumn()
    id: string;

    @Column()
    productId: string;

    @Column()
    specialistId: string;

    @ManyToOne(
        () => Product,
        (product) => product.productSpecialist
    )
    product: Product;

    @ManyToOne(
        () => Specialist,
        (specialist) => specialist.productSpecialist
    )
    specialist: Specialist;

    constructor(
        productId: string,
        specialistId: string,
        id: string
    ) {
        if (id) {
            this.id = id
        }

        if (!this.id) {
            this.id = uuidV4()
        }

        this.productId = productId
        this.specialistId = specialistId
    }
}

export { ProductSpecialist }