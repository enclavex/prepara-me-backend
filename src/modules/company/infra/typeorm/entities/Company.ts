import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("companies")
class Company {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    constructor(name: string) {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name;
    }
}

export { Company };
