import { SubscriptionPlan } from "@modules/products/infra/typeorm/entities/SubscriptionPlan";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Company } from "./Company";

@Entity("companySubscriptionPlans")
class CompanySubscriptionPlan {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Company)
    @JoinColumn({ name: "companyId" })
    company: Company;
    
    @Column()
    companyId: string;

    @ManyToOne(() => SubscriptionPlan)
    @JoinColumn({ name: "subscriptionPlanId" })
    subscriptionPlan: SubscriptionPlan;

    @Column()
    subscriptionPlanId: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    subscribeToken: string;

    constructor(
        companyId: string,
        subscriptionPlanId: string,
        startDate: Date,
        endDate: Date,
        subscribeToken: string
    ) {
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
