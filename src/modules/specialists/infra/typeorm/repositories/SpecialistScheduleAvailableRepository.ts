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
        status,
        userId,
        id
    }: ICreateSpecialistScheduleAvailableDTO): Promise<SpecialistScheduleAvailable> {
        const specialistScheduleAvailable = this.repository.create({
            dateSchedule,
            specialistId,
            status,
            id
        })

        if (userId) {
            Object.assign(specialistScheduleAvailable, { userId })
        }

        await this.repository.save(specialistScheduleAvailable);

        return specialistScheduleAvailable
    }

    async findById(id: string): Promise<SpecialistScheduleAvailable> {
        const specialistScheduleAvailable = this.repository.findOne(id)

        return specialistScheduleAvailable
    }

    async findBySpecialistIdAndDate(specialistId: string, dateBegin: Date, dateEnd: Date): Promise<SpecialistScheduleAvailable[]> {
        const specialistsScheduleAvailableQuery = this.repository
            .createQueryBuilder("ssa")
            .where("ssa.specialistId = :specialistId", { specialistId: specialistId })
            .andWhere("ssa.dateSchedule between :dateBegin and :dateEnd", { dateBegin: dateBegin, dateEnd: dateEnd })

        const specialistsScheduleAvailables = await specialistsScheduleAvailableQuery.getMany();

        return specialistsScheduleAvailables
    }
}

export { SpecialistScheduleAvailableRepository }