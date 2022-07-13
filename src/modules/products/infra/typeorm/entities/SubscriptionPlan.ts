import { SubscriptionPlanStatusEnum } from "@modules/products/enums/SubscriptionPlanStatusEnum";
import { SubscriptionPlanTypeEnum } from "@modules/products/enums/SubscriptionPlanTypeEnum";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { SubscriptionPlanProduct } from "./SubscriptionPlanProduct";

@Entity("subscriptionPlans")
class SubscriptionPlan {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: Number;

    @Column({
        type: "enum",
        enum: SubscriptionPlanStatusEnum,
        default: SubscriptionPlanStatusEnum.ACTIVE,
    })
    status: SubscriptionPlanStatusEnum;

    @Column({
        type: "enum",
        enum: SubscriptionPlanTypeEnum,
        default: SubscriptionPlanTypeEnum.COMPANY,
    })
    type: SubscriptionPlanTypeEnum;

    @OneToMany(() => SubscriptionPlanProduct, (subscriptionPlanProduct) => subscriptionPlanProduct.product)
    subscriptionPlanProduct: SubscriptionPlanProduct[];

    constructor(
        name: string,
        price: Number,
        status: SubscriptionPlanStatusEnum,
        type: SubscriptionPlanTypeEnum
    ) {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name;
        this.price = price;
        this.status = status;
        this.type = type;
    }
}

export { SubscriptionPlan };
