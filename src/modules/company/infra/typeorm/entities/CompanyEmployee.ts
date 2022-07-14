import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Company } from "./Company";

@Entity("companyEmployees")
class CompanyEmployee {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    subscribeToken: string;

    @ManyToOne(() => Company)
    @JoinColumn({ name: "companyId" })
    company: Company;

    @Column()
    companyId: string;

    @Column()
    documentId: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    userId: string;

    constructor(
        name: string,
        subscribeToken: string,
        companyId: string,
        documentId: string,
        userId: string
    ) {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name;
        this.subscribeToken = subscribeToken;
        this.companyId = companyId;
        this.documentId = documentId;
        this.userId = userId;
    }
}

export { CompanyEmployee };
