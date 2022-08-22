import { ICreateRequestScheduleDTO } from "@modules/products/dtos/ICreateRequestScheduleDTO";
import { IResponseRequestScheduleDTO } from "@modules/products/dtos/IResponseRequestScheduleDTO";
import { IRequestScheduleRepository } from "@modules/products/repositories/IRequestScheduleRepository";
import { RequestSchedule } from "../entities/RequestSchedule";
import { getRepository, Repository } from "typeorm";

class RequestScheduleRepository implements IRequestScheduleRepository {
    private repository: Repository<RequestSchedule>;

    constructor() {
        this.repository = getRepository(RequestSchedule);
    }

    async create({
        email,
        name,
        obs,
        id,
    }: ICreateRequestScheduleDTO): Promise<RequestSchedule> {
        const requestSchedule = this.repository.create({
            email,
            name,
            obs,
            id,
        });

        await this.repository.save(requestSchedule);

        return requestSchedule;
    }

    async find({ id }): Promise<IResponseRequestScheduleDTO[]> {
        const requestSchedulesQuery = this.repository.createQueryBuilder("rs");

        if (id) {
            requestSchedulesQuery.andWhere("rs.id = :id", {
                id: id,
            });
        }

        const requestSchedules = await requestSchedulesQuery.getMany();

        return requestSchedules;
    }
}

export { RequestScheduleRepository };
