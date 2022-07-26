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

    @ManyToOne(() => Product, (product) => product.subscriptionPlanProduct)
    product: Product;
    
    @Column()
    subscriptionPlanId: string;


    @Column()
    productId: string;

    @Column()
    availableQuantity: Number;

    constructor(
        subscriptionPlanId: string,
        productId: string,
        availableQuantity: Number
    ){
        if (!this.id) {
            this.id = uuidV4();
        }

        this.subscriptionPlanId = subscriptionPlanId;
        this.productId = productId;
        this.availableQuantity = availableQuantity;
    }
}

export { SubscriptionPlanProduct };
