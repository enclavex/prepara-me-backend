import { SpecialistScheduleAvailableStatusEnum } from "../enums/SpecialistScheduleAvailableStatusEnum";

interface ICreateSpecialistScheduleAvailableDTO {
    specialistId: string;
    dateSchedule: Date;
    status: SpecialistScheduleAvailableStatusEnum;
    userId?: string;
    id?: string;
}

export { ICreateSpecialistScheduleAvailableDTO }