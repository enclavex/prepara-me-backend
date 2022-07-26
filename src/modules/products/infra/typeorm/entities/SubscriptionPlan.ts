import { CompanySubscriptionPlan } from "@modules/company/infra/typeorm/entities/CompanySubscriptionPlan";
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

    @OneToMany(
        () => CompanySubscriptionPlan,
        (companySubscriptionPlan) => companySubscriptionPlan.subscriptionPlan
    )
    public companySubscriptionPlan!: CompanySubscriptionPlan[];

    @OneToMany(
        () => SubscriptionPlanProduct,
        (subscriptionPlanProduct) => subscriptionPlanProduct.subscriptionPlan
    )
    public subscriptionPlanProduct!: SubscriptionPlanProduct[];

    constructor(
        name: string,
        price: Number,
        status: SubscriptionPlanStatusEnum,
        type: SubscriptionPlanTypeEnum,
        id: string
    ) {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name;
        this.price = price;
        this.status = status;
        this.type = type;

        if (id) {
            this.id = id;
        }
    }
}

export { SubscriptionPlan };

