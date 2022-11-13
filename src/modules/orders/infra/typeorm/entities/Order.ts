import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { OrderItem } from "./OrderItem";

@Entity("companies")
class Order {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;
    @ManyToOne(() => User, (user) => user.order)
    user: User;

    @Column()
    object: string;

    @Column()
    status: string;

    @Column()
    model: string;

    @Column()
    modelId: string;

    @Column()
    headers: string;

    @Column()
    payload: string;

    @Column()
    requestUrl: string;

    @Column()
    retries: string;

    @Column()
    nextRetry: string;

    @Column()
    deliveries: string;

    @Column()
    dateCreated: Date;

    @Column()
    dateUpdated: Date;

    @Column()
    signature: string;

    @Column()
    pagarMeOrderId: string;

    @Column()
    amount: number;

    @OneToMany(
        () => OrderItem,
        (orderItem) => orderItem.order
    )
    orderItem: OrderItem[];

    constructor(
        userId: string,
        dateCreated: Date,
        amount: number,
        id?: string,
        object?: string,
        status?: string,
        model?: string,
        modelId?: string,
        headers?: string,
        payload?: string,
        requestUrl?: string,
        retries?: string,
        nextRetry?: string,
        deliveries?: string,
        dateUpdated?: Date,
        signature?: string,
        pagarMeOrderId?: string
    ) {
        if (!this.id) {
            this.id = uuidV4();
        }

        if (id) {
            this.id = id;
        }

        this.userId = userId;
        this.object = object;
        this.status = status;
        this.model = model;
        this.modelId = modelId;
        this.headers = headers;
        this.payload = payload;
        this.requestUrl = requestUrl;
        this.retries = retries;
        this.nextRetry = nextRetry;
        this.deliveries = deliveries;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.signature = signature;
        this.pagarMeOrderId = pagarMeOrderId;
        this.amount = amount;
    }
}

export { Order };

