import { ICreateSpecialistScheduleAvailableDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleAvailableDTO";
import { ISpecialistScheduleAvailableRepository } from "@modules/specialists/repositories/ISpecialistScheduleAvailableRepository";
import { getRepository, Repository } from "typeorm";
import { SpecialistScheduleAvailable } from "../entities/SpecialistScheduleAvailable";

class SpecialistScheduleAvailableRepository implements ISpecialistScheduleAvailableRepository {
    private repository: Repository<SpecialistScheduleAvailable>

    constructor() {
        this.repository = getRepository(SpecialistScheduleAvailable)
    }

    async create({
        dateSchedule,
        specialistId,
        status
    }: ICreateSpecialistScheduleAvailableDTO): Promise<SpecialistScheduleAvailable> {
        const specialistScheduleAvailable = this.repository.create({
            dateSchedule,
            specialistId,
            status
        })

        await this.repository.save(specialistScheduleAvailable);

        return specialistScheduleAvailable
    }
}

export { SpecialistScheduleAvailableRepository }