import { ICreateSpecialistScheduleAvailableDTO } from "@modules/specialists/dtos/ICreateSpecialistScheduleAvailableDTO";
import { ISpecialistScheduleAvailableRepository } from "@modules/specialists/repositories/ISpecialistScheduleAvailableRepository";
import { SpecialistScheduleAvailable } from "../../entities/SpecialistScheduleAvailable";

class SpecialistScheduleAvailableRepositoryInMemory implements ISpecialistScheduleAvailableRepository {
    specialistScheduleAvailable: SpecialistScheduleAvailable[] = []

    async create({
        dateSchedule,
        specialistId,
        status
    }: ICreateSpecialistScheduleAvailableDTO): Promise<SpecialistScheduleAvailable> {
        const specialistScheduleAvailable   = new SpecialistScheduleAvailable(
            dateSchedule,
            specialistId,
            status
        )

        this.specialistScheduleAvailable.push(specialistScheduleAvailable)

        return specialistScheduleAvailable
    }
}

export { SpecialistScheduleAvailableRepositoryInMemory }