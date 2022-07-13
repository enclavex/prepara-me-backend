import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Product } from "./Product";
import { SubscriptionPlan } from "./SubscriptionPlan";

@Entity("subscriptionPlanProducts")
class SubscriptionPlanProduct {
    @PrimaryColumn()
    id: string;

    @ManyToOne(
        () => SubscriptionPlan,
        (subscriptionPlan) => subscriptionPlan.subscriptionPlanProduct
    )
    subscriptionPlan: SubscriptionPlan;

    @Column()
    subscriptionPlanId: string;

    @ManyToOne(() => Product, (product) => product.subscriptionPlanProduct)
    product: Product;

    @Column()
    productId: string;

    @Column()
    availableQyuantity: Number;

    constructor(
        subscriptionPlanId: string,
        productId: string,
        availableQyuantity: Number
    ){
        if (!this.id) {
            this.id = uuidV4();
        }

        this.subscriptionPlanId = subscriptionPlanId;
        this.productId = productId;
        this.availableQyuantity = availableQyuantity;
    }
}

export { SubscriptionPlanProduct };
