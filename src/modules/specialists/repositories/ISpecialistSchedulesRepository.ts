import { ICreateSpecialistScheduleDTO } from "../dtos/ICreateSpecialistScheduleDTO"
import { ISpecialistScheduleResponseDTO } from "../dtos/ISpecialistScheduleResponseDTO";
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
    specialistUserId?: string;
    id?: string;
}

interface ISpecialistSchedulesRepository {
    create(data: ICreateSpecialistScheduleDTO): Promise<SpecialistSchedule>
    find(data: IRequestFind): Promise<ISpecialistScheduleResponseDTO[]>
    remove(id: string): Promise<string>;
}

export { ISpecialistSchedulesRepository }