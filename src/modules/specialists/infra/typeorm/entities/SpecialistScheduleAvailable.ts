import { v4 as uuidV4 } from "uuid"
import { SpecialistScheduleAvailableStatusEnum } from "@modules/specialists/enums/SpecialistScheduleAvailableStatusEnum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Specialist } from "./Specialist";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

@Entity("specialistScheduleAvailable")
class SpecialistScheduleAvailable {
    @PrimaryColumn()
    id: string;

    @Column()
    dateSchedule: Date;

    @Column()
    specialistId: string;

    @Column()
    userId: string;

    @ManyToOne(() => Specialist, specialist => specialist.specialistScheduleAvailable)
    specialist: Specialist;

    @ManyToOne(() => User, user => user.specialistScheduleAvailable)
    user: User;

    @Column({
        type: "enum",
        enum: SpecialistScheduleAvailableStatusEnum,
        default: SpecialistScheduleAvailableStatusEnum.AVAILABLE,
    })
    status: SpecialistScheduleAvailableStatusEnum;

    constructor(
        dateSchedule: Date,
        specialistId: string,
        status: SpecialistScheduleAvailableStatusEnum
    ) { 
        if (!this.id) {
            this.id = uuidV4()
        }

        this.dateSchedule = dateSchedule
        this.specialistId = specialistId
        this.status = status
    }
}

export { SpecialistScheduleAvailable }