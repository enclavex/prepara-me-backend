import { ICreateRequestScheduleDTO } from "../dtos/ICreateRequestScheduleDTO";
import { IResponseRequestScheduleDTO } from "../dtos/IResponseRequestScheduleDTO";
import { RequestSchedule } from "../infra/typeorm/entities/RequestSchedule";

interface IRequestFind {
    id?: string;
}

interface IRequestScheduleRepository {
    create(data: ICreateRequestScheduleDTO): Promise<RequestSchedule>;
    find(data: IRequestFind): Promise<IResponseRequestScheduleDTO[]>;
}

export { IRequestScheduleRepository };