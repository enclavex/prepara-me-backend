import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { OrderStatusEnum } from "@modules/orders/enums/OrderStatusEnum";
import { timestamp } from "aws-sdk/clients/cloudfront";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { OrderItem } from "./OrderItem";

@Entity("orders")
class Order {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;
    @ManyToOne(() => User, (user) => user.order)
    user: User;

    @Column()
    companyId: string;

    @Column()
    dateCreated: Date;

    @Column()
    dateUpdated: Date;

    @Column()
    expiresAt: Date;

    @Column()
    ordersPaid: number;

    @Column()
    pagarMeOrderId: string;

    @Column()
    shortId: string;

    @Column()
    amount: number;

    @OneToMany(
        () => OrderItem,
        (orderItem) => orderItem.order
    )
    orderItem: OrderItem[];

    @Column({
        type: "enum",
        enum: OrderStatusEnum,
        default: OrderStatusEnum.CREATED,
    })
    status: OrderStatusEnum;

    constructor(
        userId: string,
        companyId: string,
        dateCreated: Date,
        dateUpdated: Date,
        expiresAt: Date,
        ordersPaid: number,
        amount: number,
        status: OrderStatusEnum,
        shortId: string,
        id?: string,
        pagarMeOrderId?: string,
    ) {
        if (!this.id) {
            this.id = uuidV4();
        }

        if (id) {
            this.id = id;
        }

        this.userId = userId;
        this.companyId = companyId
        this.dateCreated = dateCreated
        this.dateUpdated = dateUpdated
        this.expiresAt = expiresAt
        this.ordersPaid = ordersPaid
        this.pagarMeOrderId = pagarMeOrderId;
        this.amount = amount;
        this.status = status;
        this.shortId = shortId
    }
}

export { Order };

