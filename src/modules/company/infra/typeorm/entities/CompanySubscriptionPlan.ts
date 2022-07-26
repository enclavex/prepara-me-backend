import { SubscriptionPlan } from "@modules/products/infra/typeorm/entities/SubscriptionPlan";
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Company } from "./Company";

@Entity("companySubscriptionPlans")
class CompanySubscriptionPlan {
    @PrimaryColumn()
    id: string;

    @Column()
    companyId: string;

    @Column()
    subscriptionPlanId: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    subscribeToken: string;

    @ManyToOne(() => Company, (company) => company.companySubscriptionPlan)
    public company!: Company

    @ManyToOne(() => SubscriptionPlan, (subscriptionPlan) => subscriptionPlan.companySubscriptionPlan)
    public subscriptionPlan!: SubscriptionPlan

    constructor(
        companyId: string,
        subscriptionPlanId: string,
        startDate: Date,
        endDate: Date,
        subscribeToken: string,
        id: string
    ) {
        if (id) {
            this.id = id
        }
        
        if (!this.id) {
            this.id = uuidV4();
        }

        this.companyId = companyId;
        this.subscriptionPlanId = subscriptionPlanId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.subscribeToken = subscribeToken;
    }
}

export { CompanySubscriptionPlan };

