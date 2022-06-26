import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { injectable } from "tsyringe";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
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

    @ManyToMany(() => Product, product => product.productSpecialist)
    product: Product;

    @ManyToMany(() => Specialist, specialist => specialist.productSpecialist)
    specialist: Specialist;

    constructor(
        productId: string,
        specialistId: string
    ) {
        if (!this.id) {
            this.id = uuidV4()
        }

        this.productId = productId
        this.specialistId = specialistId
    }
}

export { ProductSpecialist }