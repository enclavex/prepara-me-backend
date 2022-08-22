import { ICreateRequestScheduleDTO } from "@modules/products/dtos/ICreateRequestScheduleDTO";
import { IResponseRequestScheduleDTO } from "@modules/products/dtos/IResponseRequestScheduleDTO";
import { RequestSchedule } from "@modules/products/infra/typeorm/entities/RequestSchedule";
import { IRequestScheduleRepository } from "../IRequestScheduleRepository";

class RequestScheduleRepositoryInMemory implements IRequestScheduleRepository {
    requestSchedules: RequestSchedule[] = [];

    async create({
        email,
        name,
        obs,
        id,
    }: ICreateRequestScheduleDTO): Promise<RequestSchedule> {
        const requestSchedule = new RequestSchedule(email, name, obs, id);

        this.requestSchedules.push(requestSchedule);

        return requestSchedule;
    }

    async find({ id }): Promise<IResponseRequestScheduleDTO[]> {
        let requestSchedules = this.requestSchedules;

        if (id) {
            requestSchedules = requestSchedules.filter((requestSchedule) => {
                return requestSchedule.id === id;
            });
        }

        return requestSchedules;
    }
}

export { RequestScheduleRepositoryInMemory }