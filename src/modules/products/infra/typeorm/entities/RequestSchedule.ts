import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("requestSchedule")
class RequestSchedule {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    obs: string;

    constructor(email: string, name: string, obs: string, id: string) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.email = email;
        this.name = name;
        this.obs = obs;
    }
}

export { RequestSchedule };
