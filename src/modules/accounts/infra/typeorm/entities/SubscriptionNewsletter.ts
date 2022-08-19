import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("subscriptionNewsletter")
class SubscriptionNewsletter {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    constructor(id, email) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.email = email;
    }
}

export { SubscriptionNewsletter };
