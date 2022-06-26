import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { SpecialistStatusEnum } from "@modules/specialists/enums/SpecialistStatusEnum";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { ProductSpecialist } from "./ProductSpecialist";

@Entity("specialists")
class Specialist {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    bio: string;

    @Column({
        type: "enum",
        enum: SpecialistStatusEnum,
        default: SpecialistStatusEnum.ACTIVE,
    })
    status: SpecialistStatusEnum;

    @Column()
    userId: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column()
    linkedinUrl: string;

    @OneToMany(() => ProductSpecialist, productSpecialist => productSpecialist.specialist)
    productSpecialist: ProductSpecialist[];


    constructor(
        name: string,
        bio: string,
        status: SpecialistStatusEnum,
        userId: string,
        linkedinUrl: string) {
        if (!this.id) {
            this.id = uuidV4();
        }

        this.name = name
        this.bio = bio
        this.status = status
        this.userId = userId
        this.linkedinUrl = linkedinUrl
    }
}

export { Specialist }