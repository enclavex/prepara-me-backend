import { ICreateSpecialistScheduleDTO } from "../dtos/ICreateSpecialistScheduleDTO"
import { SpecialistScheduleStatusEnum } from "../enums/SpecialistScheduleStatusEnum";
import { SpecialistSchedule } from "../infra/typeorm/entities/SpecialistSchedule"

interface IRequestFind {
    dateBegin?: Date;
    dateEnd?: Date;
    name?: string;
    userId?: string;
    status?: SpecialistScheduleStatusEnum;
    productId?: string;
    specialistId?: string;
    id?: string;
}

interface ISpecialistSchedulesRepository {
    create(data: ICreateSpecialistScheduleDTO): Promise<SpecialistSchedule>
    find(data: IRequestFind): Promise<SpecialistSchedule[]>
    remove(id: string): Promise<string>;
}

export { ISpecialistSchedulesRepository }