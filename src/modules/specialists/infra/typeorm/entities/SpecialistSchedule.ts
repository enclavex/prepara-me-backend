import { v4 as uuidV4 } from "uuid";
import { SpecialistScheduleStatusEnum } from "@modules/specialists/enums/SpecialistScheduleStatusEnum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Specialist } from "./Specialist";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

@Entity("specialistSchedule")
class SpecialistSchedule {
    @PrimaryColumn()
    id: string;

    @Column()
    dateSchedule: Date;

    @Column()
    specialistId: string;
    @ManyToOne(() => Specialist, (specialist) => specialist.specialistSchedule)
    specialist: Specialist;
    
    @Column()
    userId: string;
    @ManyToOne(() => User, (user) => user.specialistSchedule)
    user: User;
    
    @Column()
    productId: string;
    @ManyToOne(() => User, (user) => user.specialistSchedule)
    product: Product;

    @Column({
        type: "enum",
        enum: SpecialistScheduleStatusEnum,
        default: SpecialistScheduleStatusEnum.AVAILABLE,
    })
    status: SpecialistScheduleStatusEnum;

    constructor(
        dateSchedule: Date,
        specialistId: string,
        userId: string,
        productId: string,
        status: SpecialistScheduleStatusEnum,
        id: string
    ) {
        if (id) {
            this.id = id;
        }

        if (!this.id) {
            this.id = uuidV4();
        }

        this.dateSchedule = dateSchedule;
        this.specialistId = specialistId;
        this.userId = userId;
        this.productId = productId;
        this.status = status;
    }
}

export { SpecialistSchedule };
