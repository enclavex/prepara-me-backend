import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuidV4 } from "uuid";

@Entity("userProductsAvailable")
class UserProductAvailable {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column()
    productId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "productId" })
    product: Product;

    @Column()
    availableQuantity: Number;

    constructor(userId: string, productId: string, availableQuantity: Number) {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.userId = userId;
        this.productId = productId;
        this.availableQuantity = availableQuantity;
    }
}

export { UserProductAvailable };
