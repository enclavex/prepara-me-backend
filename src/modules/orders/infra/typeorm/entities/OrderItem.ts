import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Order } from "./Order";

@Entity("companies")
class OrderItem {
    @PrimaryColumn()
    id: string;

    @Column()
    orderId: string;
    @ManyToOne(() => Order, (order) => order.orderItem)
    order: Order;

    @Column()
    productId: string;
    @ManyToOne(() => Product, (product) => product.orderItem)
    product: Product;

    @Column()
    amount: number;

    @Column()
    quantity: number;

    constructor(
        id: string,
        orderId: string,
        productId: string,
        amount: number,
        quantity: number
    ) {
        if (!this.id) {
            this.id = uuidV4();
        }

        if (id) {
            this.id = id;
        }

        this.orderId = orderId;
        this.productId = productId;
        this.amount = amount;
        this.quantity = quantity;
    }
}

export { OrderItem };

